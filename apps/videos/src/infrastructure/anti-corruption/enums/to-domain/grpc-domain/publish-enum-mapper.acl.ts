import { VideoGrpcPublishStatus } from '@app/contracts/videos';

import { VideoDomainPublishStatus } from '@videos/domain/enums';

const GrpcToDomainPublishEnumMapper = new Map<
  VideoGrpcPublishStatus,
  VideoDomainPublishStatus
>();

GrpcToDomainPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PENDING,
  VideoDomainPublishStatus.PENDING,
);
GrpcToDomainPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PROCESSING,
  VideoDomainPublishStatus.PROCESSING,
);
GrpcToDomainPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PROCESSED,
  VideoDomainPublishStatus.PROCESSED,
);
GrpcToDomainPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PUBLISHED,
  VideoDomainPublishStatus.PUBLISHED,
);
GrpcToDomainPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_FAILED,
  VideoDomainPublishStatus.FAILED,
);

export { GrpcToDomainPublishEnumMapper };
