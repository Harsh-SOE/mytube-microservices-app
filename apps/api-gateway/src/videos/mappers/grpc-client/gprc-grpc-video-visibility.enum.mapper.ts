import { VideoVisibilityStatus } from '@app/contracts/videos';
import { VideoRequestVisibilityStatus } from '../../enums';

const GrpcClientVideoVisibilityEnumMapper = new Map<
  VideoVisibilityStatus,
  VideoRequestVisibilityStatus
>();

GrpcClientVideoVisibilityEnumMapper.set(
  VideoVisibilityStatus.PRIVATE,
  VideoRequestVisibilityStatus.PRIVATE,
);
GrpcClientVideoVisibilityEnumMapper.set(
  VideoVisibilityStatus.PUBLIC,
  VideoRequestVisibilityStatus.PUBLIC,
);
GrpcClientVideoVisibilityEnumMapper.set(
  VideoVisibilityStatus.UNLISTED,
  VideoRequestVisibilityStatus.UNLISTED,
);

export { GrpcClientVideoVisibilityEnumMapper };
