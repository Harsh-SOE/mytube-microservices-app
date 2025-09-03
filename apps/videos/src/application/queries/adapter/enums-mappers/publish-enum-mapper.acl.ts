import { VideoTransportPublishStatus } from '@app/contracts/videos';
import { VideoPersistancePublishStatus } from '@peristance/videos';

const PublishPersistanceToGrpcEnumMapper = new Map<
  VideoPersistancePublishStatus,
  VideoTransportPublishStatus
>();

PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PENDING,
  VideoTransportPublishStatus.TRANSPORT_PENDING,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSING,
  VideoTransportPublishStatus.TRANSPORT_PROCESSING,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSED,
  VideoTransportPublishStatus.TRANSPORT_PROCESSED,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PUBLISHED,
  VideoTransportPublishStatus.TRANSPORT_PUBLISHED,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.FAILED,
  VideoTransportPublishStatus.TRANSPORT_FAILED,
);

export { PublishPersistanceToGrpcEnumMapper };
