import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { JwtUserPayload } from '@app/contracts/jwt';

import { UpdateUserRequestDto } from './request';
import {
  DeleteUserRequestResponse,
  FindUserRequestResponse,
  UpdatedUserRequestResponse,
} from './response';
import { UsersService } from './users.service';
import { GatewayJwtGuard } from '../jwt/guards';
import { User } from '../decorators/user.decorator';
import { USER_API } from './api';

@UseGuards(GatewayJwtGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

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
