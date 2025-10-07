import { Injectable } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { join } from 'path';

import { AUTH_PACKAGE_NAME } from '@app/contracts/auth';
import { CLOUD_PACKAGE_NAME } from '@app/contracts/cloud';
import { USER_PACKAGE_NAME } from '@app/contracts/users';
import { LIKE_PACKAGE_NAME } from '@app/contracts/likes';
import { VIDEO_PACKAGE_NAME } from '@app/contracts/videos';
import { SAGA_PACKAGE_NAME } from '@app/contracts/saga';
import { VIEWS_PACKAGE_NAME } from '@app/contracts/views';
import { COMMENT_PACKAGE_NAME } from '@app/contracts/comments';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get PORT() {
    return this.configService.getOrThrow<number>('PORT');
  }

  get ACCESS_TOKEN_EXPIRY() {
    return this.configService.getOrThrow<string>('ACCESS_TOKEN_EXPIRY');
  }

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }

  get JWT_PUBLIC_KEY() {
    const publicKey = this.configService.getOrThrow<string>('PUBLIC_KEY');
    return Buffer.from(publicKey, 'base64').toString('utf8');
  }

  get AUTH_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('AUTH_SERVICE_PORT');
  }

  get AUTH_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('AUTH_SERVICE_HOST');
  }

  get AUTH_SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/auth.proto'),
        package: AUTH_PACKAGE_NAME,
        url: `${this.AUTH_SERVICE_HOST}:${this.AUTH_SERVICE_PORT}`,
      },
    };
  }

  get CLOUD_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('CLOUD_SERVICE_PORT');
  }

  get CLOUD_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('CLOUD_SERVICE_HOST');
  }

  get CLOUD_SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/cloud.proto'),
        package: CLOUD_PACKAGE_NAME,
        url: `${this.CLOUD_SERVICE_HOST}:${this.CLOUD_SERVICE_PORT}`,
      },
    };
  }

  get USER_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('USER_SERVICE_PORT');
  }

  get USER_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('USER_SERVICE_HOST');
  }

  get USER_SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/users.proto'),
        package: USER_PACKAGE_NAME,
        url: `${this.USER_SERVICE_HOST}:${this.USER_SERVICE_PORT}`,
      },
    };
  }

  get LIKE_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('LIKE_SERVICE_PORT');
  }

  get LIKE_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('LIKE_SERVICE_HOST');
  }

  get LIKE_SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/likes.proto'),
        package: LIKE_PACKAGE_NAME,
        url: `${this.LIKE_SERVICE_HOST}:${this.LIKE_SERVICE_PORT}`,
      },
    };
  }

  get VIDEO_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('VIDEO_SERVICE_PORT');
  }

  get VIDEO_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('VIDEO_SERVICE_HOST');
  }

  get VIDEO_SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/videos.proto'),
        package: VIDEO_PACKAGE_NAME,
        url: `${this.VIDEO_SERVICE_HOST}:${this.VIDEO_SERVICE_PORT}`,
      },
    };
  }

  get SAGA_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SAGA_SERVICE_PORT');
  }

  get SAGA_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('SAGA_SERVICE_HOST');
  }

  get SAGA_SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/saga.proto'),
        package: SAGA_PACKAGE_NAME,
        url: `${this.SAGA_SERVICE_HOST}:${this.SAGA_SERVICE_PORT}`,
      },
    };
  }

  get COMMENT_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('COMMENT_SERVICE_PORT');
  }

  get COMMENT_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('COMMENT_SERVICE_HOST');
  }

  get COMMENT_SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/comments.proto'),
        package: COMMENT_PACKAGE_NAME,
        url: `${this.COMMENT_SERVICE_HOST}:${this.CLOUD_SERVICE_PORT}`,
      },
    };
  }

  get REDIS_PORT() {
    return this.configService.getOrThrow<number>('REDIS_PORT');
  }

  get REDIS_HOST() {
    return this.configService.getOrThrow<string>('REDIS_HOST');
  }

  get NODE_ENV() {
    return this.configService.getOrThrow<string>('NODE_ENVIRONMENT');
  }

  get JWT_TOKEN_OPTIONS() {
    const options: JwtModuleOptions = {
      publicKey: this.JWT_PUBLIC_KEY,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: this.ACCESS_TOKEN_EXPIRY,
      },
    };
    return options;
  }

  get WATCH_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('WATCH_SERVICE_HOST');
  }

  get WATCH_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('WATCH_SERVICE_PORT');
  }

  get WATCH_SERVICE_OPTION(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: VIEWS_PACKAGE_NAME,
        protoPath: join(__dirname, '../proto/views.proto'),
        url: `${this.WATCH_SERVICE_HOST}:${this.WATCH_SERVICE_PORT}`,
      },
    };
  }

  get AUTH0_CLIENT_ID() {
    return this.configService.getOrThrow<string>('AUTH0_CLIENT_ID');
  }

  get AUTH0_CLIENT_SECRET() {
    return this.configService.getOrThrow<string>('AUTH0_CLIENT_SECRET');
  }

  get AUTH0_CLIENT_DOMAIN() {
    return this.configService.getOrThrow<string>('AUTH0_CLIENT_DOMAIN');
  }

  get AUTH0_DATABASE_NAME() {
    return this.configService.getOrThrow<string>('AUTH0_DATABASE_NAME');
  }

  get AUTH0_CALLBACK_URL() {
    return this.configService.getOrThrow<string>('AUTH0_CALLBACK_URL');
  }

  get EXPRESS_SESSION_SECRET() {
    return this.configService.getOrThrow<string>('EXPRESS_SESSION_SECRET');
  }
}
