import { GrpcTransportPublishStatus } from '@app/contracts/videos';

import { VideoDomainPublishStatus } from '@videos/domain/enums';

const GrpcToDomainPublishEnumMapper = new Map<
  GrpcTransportPublishStatus,
  VideoDomainPublishStatus
>();

GrpcToDomainPublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_PENDING,
  VideoDomainPublishStatus.PENDING,
);
GrpcToDomainPublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_PROCESSING,
  VideoDomainPublishStatus.PROCESSING,
);
GrpcToDomainPublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_PROCESSED,
  VideoDomainPublishStatus.PROCESSED,
);
GrpcToDomainPublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_PUBLISHED,
  VideoDomainPublishStatus.PUBLISHED,
);
GrpcToDomainPublishEnumMapper.set(
  GrpcTransportPublishStatus.GRPC_FAILED,
  VideoDomainPublishStatus.FAILED,
);

export { GrpcToDomainPublishEnumMapper };
