import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { UserAuth } from '../database/schema/user-auth.schema';
import { BaseEntityRepository } from './entity.repository';

export class UserAuthRepository
  implements BaseEntityRepository<UserAuth, FilterQuery<UserAuth>>
{
  constructor(@InjectModel(UserAuth.name) private user: Model<UserAuth>) {}

  async create(entity: UserAuth): Promise<UserAuth> {
    return await this.user.create(entity);
  }

  async deleteOne(filter: FilterQuery<UserAuth>): Promise<boolean> {
    const deletedResult = await this.user.deleteOne(filter);
    return deletedResult.deletedCount === 1 ? true : false;
  }

  async updatePassword(
    filter: FilterQuery<UserAuth>,
    newPassword: string,
  ): Promise<UserAuth> {
    const updatedAuthDetails = await this.user.findOneAndUpdate(
      filter,
      { userPasswordHash: newPassword },
      { new: true },
    );
    if (!updatedAuthDetails) throw new NotFoundException(`User was not found`);
    return updatedAuthDetails;
  }

  async updatePasswordById(id: string, newPassword: string): Promise<UserAuth> {
    console.log(`Finding by id...`);
    const updatedAuthDetails = await this.user.findOneAndUpdate(
      { userId: id },
      { userPasswordHash: newPassword },
      { new: true },
    );
    if (!updatedAuthDetails) throw new NotFoundException(`User was not found`);
    return updatedAuthDetails;
  }

  async findOne(filter: FilterQuery<UserAuth>): Promise<UserAuth> {
    const foundUser = await this.user.findOne(filter, {}, { lean: true });
    if (!foundUser) throw new NotFoundException(`User was not found`);
    return foundUser;
  }
}
