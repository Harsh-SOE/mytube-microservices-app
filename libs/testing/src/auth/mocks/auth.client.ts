import { ClientGrpc } from '@nestjs/microservices';

import { AuthGrpcServiceMock } from './auth.service';

export const AuthClientMock = (): Pick<ClientGrpc, 'getService'> => {
  return { getService: jest.fn().mockReturnValue(AuthGrpcServiceMock()) };
};
