import { Inject, Injectable } from '@nestjs/common';
import {
  circuitBreaker,
  CircuitBreakerPolicy,
  CircuitState,
  ConsecutiveBreaker,
  ExponentialBackoff,
  handleAll,
  IPolicy,
  retry,
  RetryPolicy,
  wrap,
} from 'cockatiel';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

import { LoggerPort, LOGGER_PORT } from '@videos/application/ports';
import { AppConfigService, Components } from '@videos/infrastructure/config';

import {
  DatabaseConnectionException,
  DatabaseEntryAlreadyExistsException,
  DatabaseInvalidQueryException,
  DatabaseUnknownException,
} from '../exceptions';
import { DatabaseFilterOptions } from '../types';

@Injectable()
export class VideoRepoFilter {
  private retryPolicy: RetryPolicy;
  private circuitBreakerPolicy: CircuitBreakerPolicy;
  private operationPolicy: IPolicy;

  constructor(
    private readonly configService: AppConfigService,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {}

  public retryPolicyConfig(maxRetryAttempts: number) {
    this.retryPolicy = retry(handleAll, {
      maxAttempts: maxRetryAttempts,
      backoff: new ExponentialBackoff(),
    });

    this.retryPolicy.onRetry(() => {
      this.logger.alert('Database operation has failed, retrying...', {
        component: Components.DATABASE,
      });
    });

    this.retryPolicy.onSuccess(() =>
      this.logger.info('Database operation completed successfully...', {
        component: Components.DATABASE,
      }),
    );
  }

  public circuitBreakerConfig(
    requestBreakerCount: number,
    allowHalfRequests: number,
  ) {
    this.circuitBreakerPolicy = circuitBreaker(handleAll, {
      halfOpenAfter: allowHalfRequests * 1000,
      breaker: new ConsecutiveBreaker(requestBreakerCount),
    });

    this.circuitBreakerPolicy.onBreak(() =>
      this.logger.alert(
        'Too many request failed, Circuit is now Opened/broken',
        {
          circuitState: CircuitState.Open,
        },
      ),
    );

    this.circuitBreakerPolicy.onHalfOpen(() =>
      this.logger.alert(
        'Allowing only half of the requests to be executed now!',
        {
          component: Components.DATABASE,
          circuitState: CircuitState.HalfOpen,
        },
      ),
    );

    this.circuitBreakerPolicy.onReset(() =>
      this.logger.info('Circuit breaker is now reset!', {
        component: Components.DATABASE,
      }),
    );
  }

  onModuleInit() {
    this.retryPolicyConfig(3);
    this.circuitBreakerConfig(10, 15);
    this.operationPolicy = wrap(this.retryPolicy, this.circuitBreakerPolicy);
  }

  async filter<TResult, TFallback = never>(
    databaseOperation: () => Promise<TResult>,
    options: DatabaseFilterOptions<TFallback>,
  ): Promise<TResult | NonNullable<TFallback>> {
    const {
      operationType,
      logErrors = true,
      suppressErrors = false,
      fallbackValue,
      entry,
      filter,
    } = options || {};
    try {
      return await databaseOperation();
    } catch (error) {
      if (suppressErrors && fallbackValue) {
        return fallbackValue;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002': {
            if (logErrors) {
              this.logger.error(`Entry already exist`, {
                component: Components.DATABASE,
                service: 'LIKES',
                error,
              });
            }

            throw new DatabaseEntryAlreadyExistsException({
              message: `User has already liked this video`,
              contextError: error,
              meta: {
                host: this.configService.DATABASE_URL,
                entityToCreate: entry,
              },
            });
          }

          case 'P2000':
          case 'P2001':
          case 'P2009': {
            if (logErrors) {
              this.logger.error(`Invalid query was recieved`, {
                component: Components.DATABASE,
                service: 'LIKES',
                error,
              });
            }

            throw new DatabaseInvalidQueryException({
              message: `Invalid query was recieved for a database operation`,
              contextError: error,
              meta: {
                host: this.configService.DATABASE_URL,
                query: error.meta,
                operationType,
                entry,
                filter,
              },
            });
          }

          default: {
            if (logErrors) {
              this.logger.error(`An Unknown error has occured`, {
                component: Components.DATABASE,
                service: 'LIKES',
                error,
              });
            }

            throw new DatabaseUnknownException({
              message: `Internal server error due to database error`,
              meta: { host: this.configService.DATABASE_URL },
              contextError: error,
            });
          }
        }
      } else if (error instanceof PrismaClientUnknownRequestError) {
        if (logErrors) {
          this.logger.error(`An Unknown error has occured`, {
            component: Components.DATABASE,
            service: 'LIKES',
            error,
          });
        }

        throw new DatabaseUnknownException({
          message: `Internal server error due to database error`,
          meta: { host: this.configService.DATABASE_URL },
          contextError: error,
        });
      } else if (error instanceof PrismaClientInitializationError) {
        if (logErrors) {
          this.logger.error(
            `Unable to connect to database: ${this.configService.DATABASE_URL}`,
            {
              component: Components.DATABASE,
              service: 'LIKES',
              error,
            },
          );
        }

        throw new DatabaseConnectionException({
          message: `Unable to connect to database`,
          meta: { host: this.configService.DATABASE_URL },
          contextError: error,
        });
      } else if (error instanceof PrismaClientValidationError) {
        if (logErrors) {
          this.logger.error(`Invalid query was recieved`, {
            component: Components.DATABASE,
            service: 'LIKES',
            error,
          });
        }

        throw new DatabaseInvalidQueryException({
          message: `Invalid query was recieved for a database operation`,
          contextError: error,
          meta: {
            host: this.configService.DATABASE_URL,
          },
        });
      }
      if (logErrors) {
        this.logger.error(`An Unknown error has occured`, {
          component: Components.DATABASE,
          service: 'LIKES',
          error: error as Error,
        });
      }

      throw new DatabaseUnknownException({
        message: `Internal server error due to database error`,
        meta: { host: this.configService.DATABASE_URL },
        contextError: error as Error,
      });
    }
  }
}
