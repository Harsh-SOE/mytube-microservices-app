import { ClientGrpc } from '@nestjs/microservices';

import { SagaGrpcServiceMock } from './saga.service';

export const SagaClientMock = (): Pick<ClientGrpc, 'getService'> => {
  return { getService: jest.fn().mockReturnValue(SagaGrpcServiceMock()) };
};
