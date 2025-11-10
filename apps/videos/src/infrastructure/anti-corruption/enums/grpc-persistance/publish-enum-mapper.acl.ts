import { VideoGrpcPublishStatus } from '@app/contracts/videos';

import { VideoPersistancePublishStatus } from '@peristance/videos';

const GrpcToPersistancePublishEnumMapper = new Map<
  VideoGrpcPublishStatus,
  VideoPersistancePublishStatus
>();

GrpcToPersistancePublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PENDING,
  VideoPersistancePublishStatus.PENDING,
);
GrpcToPersistancePublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PROCESSING,
  VideoPersistancePublishStatus.PROCESSING,
);
GrpcToPersistancePublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PROCESSED,
  VideoPersistancePublishStatus.PROCESSED,
);
GrpcToPersistancePublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PUBLISHED,
  VideoPersistancePublishStatus.PUBLISHED,
);
GrpcToPersistancePublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_FAILED,
  VideoPersistancePublishStatus.FAILED,
);

export { GrpcToPersistancePublishEnumMapper };
