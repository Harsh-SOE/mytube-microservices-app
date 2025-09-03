// export class UpdateUserRequestDto {
//   email: string;

import { UpdateUserRequestDto } from '../../../request';

//   fullName: string;

//   dob: string;
// }

export const UpdateUserRequestDtoStub = (): UpdateUserRequestDto => {
  return {
    fullName: 'updated-test-username',
    email: 'updated-test@email.com',
  };
};
