import { UserSignupDto } from '@app/contracts/users';

export const UserSignupDtoStub = (): UserSignupDto => {
  return {
    id: '123abc',
    userName: 'test-username',
    email: 'test@gmail.com',
    dob: '2003-03-24',
    fullName: 'test-fullname',
    avatar: 'test-avatar',
    coverImage: 'test-cover',
  };
};
