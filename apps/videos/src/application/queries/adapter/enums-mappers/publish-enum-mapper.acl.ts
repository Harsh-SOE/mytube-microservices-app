import { VideoPublishStatus } from '@app/contracts/videos';
import { VideoPersistancePublishStatus } from '@peristance/videos';

const PublishPersistanceToGrpcEnumMapper = new Map<
  VideoPersistancePublishStatus,
  VideoPublishStatus
>();

PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PENDING,
  VideoPublishStatus.VIDEO_PUBLISH_STATUS_PENDING,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSING,
  VideoPublishStatus.VIDEO_PUBLISH_STATUS_PROCESSING,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSED,
  VideoPublishStatus.VIDEO_PUBLISH_STATUS_PROCESSED,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PUBLISHED,
  VideoPublishStatus.VIDEO_PUBLISH_STATUS_PUBLISHED,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.FAILED,
  VideoPublishStatus.VIDEO_PUBLISH_STATUS_FAILED,
);

export { PublishPersistanceToGrpcEnumMapper as PublishPeristanceToGrpcEnum };
