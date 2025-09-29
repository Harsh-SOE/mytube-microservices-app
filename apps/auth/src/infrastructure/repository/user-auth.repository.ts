import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { UserAuth } from '@auth/infrastructure/persistance';

import { BaseEntityRepository } from './entity.repository';
import { UserCredentialNotFoundException } from '@auth/application/errors';

export class UserAuthRepository
  implements BaseEntityRepository<UserAuth, FilterQuery<UserAuth>>
{
  constructor(@InjectModel(UserAuth.name) private user: Model<UserAuth>) {}

  async saveUserCredentials(entity: UserAuth): Promise<UserAuth> {
    return await this.user.create(entity);
  }

  async deleteUserCredentials(
    filter: FilterQuery<UserAuth>,
  ): Promise<UserAuth> {
    const deletedUser = await this.user.findOneAndDelete(filter, {
      lean: true,
    });
    if (!deletedUser) {
      throw new UserCredentialNotFoundException(
        `No user with filter: ${JSON.stringify(filter)} was found in the database`,
      );
    }
    return deletedUser;
  }

  async deleteUserCredentialsById(id: string): Promise<UserAuth> {
    const deletedResult = await this.user.findByIdAndDelete(id, { lean: true });
    if (deletedResult) return deletedResult;
    throw new UserCredentialNotFoundException(
      `User with id:${id} was not found in the database`,
    );
  }

  async updateSigninPassword(
    filter: FilterQuery<UserAuth>,
    newPassword: string,
  ): Promise<UserAuth> {
    const updatedAuthDetails = await this.user.findOneAndUpdate(
      filter,
      { userPasswordHash: newPassword },
      { new: true, lean: true },
    );
    if (updatedAuthDetails === null)
      throw new UserCredentialNotFoundException(
        `No user with filter: ${JSON.stringify(filter)} was found in the database`,
      );
    return updatedAuthDetails;
  }

  async updateSigninPasswordById(
    id: string,
    newPassword: string,
  ): Promise<UserAuth> {
    const updatedAuthDetails = await this.user.findByIdAndUpdate(
      id,
      { userPasswordHash: newPassword },
      { new: true, lean: true },
    );
    if (!updatedAuthDetails)
      throw new UserCredentialNotFoundException(
        `User with id:${id} was not found in the database`,
      );
    return updatedAuthDetails;
  }

  async FindOneUser(filter: FilterQuery<UserAuth>): Promise<UserAuth> {
    const foundUser = await this.user.findOne(filter, {}, { lean: true });
    if (!foundUser)
      throw new UserCredentialNotFoundException(
        `No user with filter: ${JSON.stringify(filter)} was found in the database`,
      );
    return foundUser;
  }

  async FindOneUserById(id: string): Promise<UserAuth> {
    const foundUser = await this.user.findById(id, {}, { lean: true });
    if (!foundUser)
      throw new UserCredentialNotFoundException(
        `User with id:${id} was not found in the database`,
      );
    return foundUser;
  }
}
