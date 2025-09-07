import {
  DatabaseConnectionFailedException,
  DatabaseException,
  InvalidDatabaseQueryException,
  UserAlreadyExistsException,
} from '@app/errors';

import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export async function handlePrismaPersistanceOperation<T>(
  databaseOperation: () => Promise<T>,
) {
  try {
    return await databaseOperation();
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': {
          // Unique constraint failed
          throw new UserAlreadyExistsException(
            `A user with given credentials already exsists in the database`,
          );
          break;
        }
        case 'P2000':
        case 'P2001':
        case 'P2009': {
          // Invalid query input
          throw new InvalidDatabaseQueryException(
            `Invalid query was recieved for a database operation`,
          );
          break;
        }
        default: {
          // any other database error from prisma
          throw new DatabaseException(
            `Internal server error due to database error`,
          );
          break;
        }
      }
    } else if (error instanceof PrismaClientUnknownRequestError) {
      // an unknown database error
      throw new DatabaseException(`Something went wrong`);
    }
    // connection errors:
    else if (error instanceof PrismaClientInitializationError) {
      // connection error from prisma
      throw new DatabaseConnectionFailedException(
        `Unable to connect to database`,
      );
    } else if (error instanceof PrismaClientValidationError) {
      // prisma query invlaid
      throw new InvalidDatabaseQueryException(`Invalid query was created`);
    }
    throw new DatabaseException(`Something went wrong`);
  }
}
