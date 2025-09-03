import { ClientGrpc } from '@nestjs/microservices';
import { UserGrpcServiceMock } from './user.service';

export const userClientMock = (): Pick<ClientGrpc, 'getService'> => {
  return {
    getService: jest.fn().mockReturnValue(UserGrpcServiceMock()),
  };
};
