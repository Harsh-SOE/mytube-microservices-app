import { VideoVisibilityStatus } from '@app/contracts/videos';
import { VideoRequestVisibilityStatus } from '../../enums';

const ClientGrpcVideoVisibilityEnumMapper = new Map<
  VideoRequestVisibilityStatus,
  VideoVisibilityStatus
>();

ClientGrpcVideoVisibilityEnumMapper.set(
  VideoRequestVisibilityStatus.PRIVATE,
  VideoVisibilityStatus.PRIVATE,
);
ClientGrpcVideoVisibilityEnumMapper.set(
  VideoRequestVisibilityStatus.PUBLIC,
  VideoVisibilityStatus.PUBLIC,
);
ClientGrpcVideoVisibilityEnumMapper.set(
  VideoRequestVisibilityStatus.UNLISTED,
  VideoVisibilityStatus.UNLISTED,
);

export { ClientGrpcVideoVisibilityEnumMapper };
