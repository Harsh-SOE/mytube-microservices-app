import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserAuthPayload } from '@app/contracts/auth';

import { GatewayJwtGuard } from '@gateway/proxies/auth/guards';
import { User } from '@gateway/proxies/auth/decorators';

import {
  PreSignedUrlRequestDto,
  SaveUserProfileDto,
  UpdateUserRequestDto,
} from './request';
import {
  DeleteUserRequestResponse,
  FindUserRequestResponse,
  PreSignedUrlRequestResponse,
  UpdatedUserRequestResponse,
} from './response';
import { UsersService } from './users.service';
import { USER_API } from './api';

@UseGuards(GatewayJwtGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post(USER_API.PRESIGNED_URL_FOR_AVATAR_FILE)
  getPresignedUrl(
    @Body() FileMetaDataDto: PreSignedUrlRequestDto,
    @User('id') userId: string,
  ): Promise<PreSignedUrlRequestResponse> {
    return this.userService.getPresignedUploadUrl(FileMetaDataDto, userId);
  }

  @Post(USER_API.SAVE_USER)
  async saveUserInDatabase(saveUserProfileDto: SaveUserProfileDto): Promise<{
    token: string;
  }> {
    return await this.userService.saveUserInDatabase(saveUserProfileDto);
  }

  @Patch(USER_API.UPDATE_DETAILS)
  updateUserDetails(
    @Body() updateUserDto: UpdateUserRequestDto,
    @User() loggedInUser: UserAuthPayload,
  ): Promise<UpdatedUserRequestResponse> {
    return this.userService.updateUserDetails(loggedInUser.id, updateUserDto);
  }

  @Delete(USER_API.DELETE_USER)
  deleteUser(
    @User() loggedInUser: UserAuthPayload,
  ): Promise<DeleteUserRequestResponse> {
    return this.userService.deleteUser(loggedInUser);
  }

  @Get(USER_API.GET_CURRENTLY_LOGGED_IN_USER)
  GetCurrentlySignedInUser(
    @User() loggedInUser: UserAuthPayload,
  ): Promise<FindUserRequestResponse> {
    return this.userService.getCurrentlyLoggedInUser(loggedInUser.id);
  }

  @Get(USER_API.GET_ALL_USERS)
  getAllRegisteredUser(): Promise<FindUserRequestResponse[]> {
    return this.userService.getAllRegisteredUser();
  }
}
