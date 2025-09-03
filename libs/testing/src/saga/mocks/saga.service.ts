import { of } from 'rxjs';

import { SagaServiceClient } from '@app/contracts/saga';

import { SagaSignupResponseStub } from '../stubs/response';

export const SagaGrpcServiceMock = (): Pick<
  SagaServiceClient,
  'userSignupFlow'
> => ({
  userSignupFlow: jest.fn().mockReturnValue(of(SagaSignupResponseStub())),
});
