import { SignupUserHandler } from './signup-user-command/signup-user.handler';
import { UpdateUserProfileHandler } from './update-profile-user-command/update-profile-user.handler';

export const UserCommandHandlers = [
  SignupUserHandler,
  UpdateUserProfileHandler,
];

export * from './signup-user-command/signup-user.command';
export * from './signup-user-command/signup-user.handler';
export * from './update-profile-user-command/update-profile-user.command';
export * from './update-profile-user-command/update-profile-user.handler';
