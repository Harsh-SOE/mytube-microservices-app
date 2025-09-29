import { ProviderTransport } from '@app/contracts/auth';
import { Providers } from '../../enums';

const GrpcClientProviderEnumMapper = new Map<ProviderTransport, Providers>();

GrpcClientProviderEnumMapper.set(
  ProviderTransport.TRANSPORT_LOCAL,
  Providers.LOCAL,
);
GrpcClientProviderEnumMapper.set(
  ProviderTransport.TRANSPORT_GOOGLE,
  Providers.GOOGLE,
);
GrpcClientProviderEnumMapper.set(
  ProviderTransport.TRANSPORT_GITHUB,
  Providers.GITHUB,
);
GrpcClientProviderEnumMapper.set(
  ProviderTransport.TRANSPORT_APPLE,
  Providers.APPLE,
);
GrpcClientProviderEnumMapper.set(
  ProviderTransport.TRANSPORT_MICROSOFT,
  Providers.MICROSOFT,
);

export { GrpcClientProviderEnumMapper };
