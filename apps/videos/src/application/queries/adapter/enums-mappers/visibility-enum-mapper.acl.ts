import { VideoVisibilityStatus } from '@app/contracts/videos';
import { VideoPersistanceVisibilityStatus } from '@peristance/videos';

const VisibilityPersistanceToGrpcEnumMapper = new Map<
  VideoPersistanceVisibilityStatus,
  VideoVisibilityStatus
>();

VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.PRIVATE,
  VideoVisibilityStatus.VIDEO_VISIBILTY_STATUS_PRIVATE,
);
VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.PUBLIC,
  VideoVisibilityStatus.VIDEO_VISIBILTY_STATUS_PUBLIC,
);
VisibilityPersistanceToGrpcEnumMapper.set(
  VideoPersistanceVisibilityStatus.UNLISTED,
  VideoVisibilityStatus.VIDEO_VISIBILTY_STATUS_UNLISTED,
);

export { VisibilityPersistanceToGrpcEnumMapper };
