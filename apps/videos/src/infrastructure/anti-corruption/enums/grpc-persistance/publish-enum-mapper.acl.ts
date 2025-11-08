import { GrpcTransportPublishStatus } from '@app/contracts/videos';

import { VideoPersistancePublishStatus } from '@peristance/videos';

const GrpcToPersistancePublishEnumMapper = new Map<
  GrpcTransportPublishStatus,
  VideoPersistancePublishStatus
>();

GrpcToPersistancePublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_PENDING,
  VideoPersistancePublishStatus.PENDING,
);
GrpcToPersistancePublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_PROCESSING,
  VideoPersistancePublishStatus.PROCESSING,
);
GrpcToPersistancePublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_PROCESSED,
  VideoPersistancePublishStatus.PROCESSED,
);
GrpcToPersistancePublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_PUBLISHED,
  VideoPersistancePublishStatus.PUBLISHED,
);
GrpcToPersistancePublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_FAILED,
  VideoPersistancePublishStatus.FAILED,
);

export { GrpcToPersistancePublishEnumMapper };
