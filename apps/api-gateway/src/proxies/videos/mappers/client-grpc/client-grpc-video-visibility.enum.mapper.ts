import { VideoGrpcVisibilityStatus } from '@app/contracts/videos';
import { VideoRequestVisibilityStatus } from '../../enums';

const ClientGrpcVideoVisibilityEnumMapper = new Map<
  VideoRequestVisibilityStatus,
  VideoGrpcVisibilityStatus
>();

ClientGrpcVideoVisibilityEnumMapper.set(
  VideoRequestVisibilityStatus.PRIVATE,
  VideoGrpcVisibilityStatus.GRPC_PRIVATE,
);
ClientGrpcVideoVisibilityEnumMapper.set(
  VideoRequestVisibilityStatus.PUBLIC,
  VideoGrpcVisibilityStatus.GRPC_PUBLIC,
);
ClientGrpcVideoVisibilityEnumMapper.set(
  VideoRequestVisibilityStatus.UNLISTED,
  VideoGrpcVisibilityStatus.GRPC_UNLISTED,
);

export { ClientGrpcVideoVisibilityEnumMapper };
