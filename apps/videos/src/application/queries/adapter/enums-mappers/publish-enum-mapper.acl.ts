import { GrpcTransportPublishStatus } from '@app/contracts/videos';

import { VideoPersistancePublishStatus } from '@peristance/videos';

const PublishPersistanceToGrpcEnumMapper = new Map<
  VideoPersistancePublishStatus,
  GrpcTransportPublishStatus
>();

PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PENDING,
  GrpcTransportPublishStatus.GRPC_PENDING,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSING,
  GrpcTransportPublishStatus.GRPC_PROCESSING,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PROCESSED,
  GrpcTransportPublishStatus.GRPC_PROCESSED,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.PUBLISHED,
  GrpcTransportPublishStatus.GRPC_PUBLISHED,
);
PublishPersistanceToGrpcEnumMapper.set(
  VideoPersistancePublishStatus.FAILED,
  GrpcTransportPublishStatus.GRPC_FAILED,
);

export { PublishPersistanceToGrpcEnumMapper };
