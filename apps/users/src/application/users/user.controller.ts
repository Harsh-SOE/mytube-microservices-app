import {
  Controller,
  NotImplementedException,
  UseFilters,
} from '@nestjs/common';

import {
  UserServiceController,
  UserSignupDto,
  UserSignupResponse,
  UserLoginDto,
  UserLoginResponse,
  UserFindByIdDto,
  UserFoundResponse,
  UsersFoundResponse,
  UserUpdateDto,
  userUpdateProfileResponse,
  UserServiceControllerMethods,
  UsersHealthCheckRequest,
  UsersHealthCheckResponse,
} from '@app/contracts/users';
import { GrpcAppExceptionFilter } from '@app/utils';

import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Controller()
@UseFilters(GrpcAppExceptionFilter)
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  check(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: UsersHealthCheckRequest,
  ):
    | Promise<UsersHealthCheckResponse>
    | Observable<UsersHealthCheckResponse>
    | UsersHealthCheckResponse {
    return { status: 1 }; // 1 = SERVING
  }

  async userSignup(createUserDto: UserSignupDto): Promise<UserSignupResponse> {
    return this.userService.signup(createUserDto);
  }

  async login(userLoginDto: UserLoginDto): Promise<UserLoginResponse> {
    return this.userService.login(userLoginDto);
  }

  findAllUsers(): Promise<UsersFoundResponse> {
    return this.userService.findAllUsers();
  }

  findOneUserById(userFindByDto: UserFindByIdDto): Promise<UserFoundResponse> {
    return this.userService.findOneUserById(userFindByDto);
  }

  async updateUserProfile(
    userUpdateDto: UserUpdateDto,
  ): Promise<userUpdateProfileResponse> {
    return this.userService.updateProfile(userUpdateDto);
  }

  remove(id: string): Promise<boolean> {
    throw new NotImplementedException(
      `Remove method has not been implemented yet: ${id}`,
    );
  }

  getPasswordHash(id: string): Promise<string> {
    throw new NotImplementedException(
      `getPasswordHash method has not been implemented yet: ${id}`,
    );
  }
}
