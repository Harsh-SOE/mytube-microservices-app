import { VideoGrpcPublishStatus } from '@app/contracts/videos';

import { VideoDomainPublishStatus } from '@videos/domain/enums';

const DomainToGrpcPublishEnumMapper = new Map<
  VideoDomainPublishStatus,
  VideoGrpcPublishStatus
>();

DomainToGrpcPublishEnumMapper.set(
  VideoDomainPublishStatus.PENDING,
  VideoGrpcPublishStatus.GRPC_PENDING,
);
DomainToGrpcPublishEnumMapper.set(
  VideoDomainPublishStatus.PROCESSING,
  VideoGrpcPublishStatus.GRPC_PROCESSING,
);
DomainToGrpcPublishEnumMapper.set(
  VideoDomainPublishStatus.PROCESSED,
  VideoGrpcPublishStatus.GRPC_PROCESSED,
);
DomainToGrpcPublishEnumMapper.set(
  VideoDomainPublishStatus.PUBLISHED,
  VideoGrpcPublishStatus.GRPC_PUBLISHED,
);
DomainToGrpcPublishEnumMapper.set(
  VideoDomainPublishStatus.FAILED,
  VideoGrpcPublishStatus.GRPC_FAILED,
);

export { DomainToGrpcPublishEnumMapper };
