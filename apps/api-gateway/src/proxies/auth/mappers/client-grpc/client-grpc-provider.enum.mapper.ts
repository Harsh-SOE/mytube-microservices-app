import { ProviderTransport } from '@app/contracts/auth';
import { Providers } from '../../enums';

const ClientGrpcProviderEnumMapper = new Map<Providers, ProviderTransport>();

ClientGrpcProviderEnumMapper.set(
  Providers.LOCAL,
  ProviderTransport.TRANSPORT_LOCAL,
);
ClientGrpcProviderEnumMapper.set(
  Providers.GOOGLE,
  ProviderTransport.TRANSPORT_GOOGLE,
);
ClientGrpcProviderEnumMapper.set(
  Providers.GITHUB,
  ProviderTransport.TRANSPORT_GITHUB,
);
ClientGrpcProviderEnumMapper.set(
  Providers.APPLE,
  ProviderTransport.TRANSPORT_APPLE,
);
ClientGrpcProviderEnumMapper.set(
  Providers.MICROSOFT,
  ProviderTransport.TRANSPORT_MICROSOFT,
);

export { ClientGrpcProviderEnumMapper };
