import { VideoGrpcPublishStatus } from '@app/contracts/videos';

import { VideoPersistancePublishStatus } from '@peristance/videos';

const PublishPersistanceToGrpcEnumMapper = new Map<
  VideoPersistancePublishStatus,
  VideoGrpcPublishStatus
>();

PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PENDING,
  VideoGrpcPublishStatus.GRPC_PENDING,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSING,
  VideoGrpcPublishStatus.GRPC_PROCESSING,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSED,
  VideoGrpcPublishStatus.GRPC_PROCESSED,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PUBLISHED,
  VideoGrpcPublishStatus.GRPC_PUBLISHED,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.FAILED,
  VideoGrpcPublishStatus.GRPC_FAILED,
);

export { PublishPersistanceToGrpcEnumMapper };
