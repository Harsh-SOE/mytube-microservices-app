import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { JwtUserPayload } from '@app/contracts/jwt';

import { GatewayJwtGuard } from '@gateway/infrastructure/passport';
import { User } from '@gateway/utils/decorators';

import { UpdateUserRequestDto } from './request';
import {
  DeleteUserRequestResponse,
  FindUserRequestResponse,
  UpdatedUserRequestResponse,
} from './response';
import { UsersService } from './users.service';
import { USER_API } from './api';
import { Auth0ProfileUser } from '@gateway/infrastructure/passport/payloads';

@UseGuards(GatewayJwtGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(USER_API.SAVE_USER)
  saveUserInDatabase(auth0ProfileUser: Auth0ProfileUser) {
    // save user in the database by calling the user service...
    return this.userService.saveUserInDatabase(auth0ProfileUser);
  }

  @Patch(USER_API.UPDATE_DETAILS)
  updateUserDetails(
    @Body() updateUserDto: UpdateUserRequestDto,
    @User() loggedInUser: JwtUserPayload,
  ): Promise<UpdatedUserRequestResponse> {
    return this.userService.updateUserDetails(loggedInUser.id, updateUserDto);
  }

  @Delete(USER_API.DELETE_USER)
  deleteUser(
    @User() loggedInUser: JwtUserPayload,
  ): Promise<DeleteUserRequestResponse> {
    return this.userService.deleteUser(loggedInUser);
  }

  @Get(USER_API.GET_CURRENTLY_LOGGED_IN_USER)
  GetCurrentlySignedInUser(
    @User() loggedInUser: JwtUserPayload,
  ): Promise<FindUserRequestResponse> {
    return this.userService.getCurrentlyLoggedInUser(loggedInUser.id);
  }

  @Get(USER_API.GET_ALL_USERS)
  getAllRegisteredUser(): Promise<FindUserRequestResponse[]> {
    return this.userService.getAllRegisteredUser();
  }
}
