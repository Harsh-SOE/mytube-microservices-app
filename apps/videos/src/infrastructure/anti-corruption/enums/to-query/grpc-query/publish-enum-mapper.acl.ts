import { VideoGrpcPublishStatus } from '@app/contracts/videos';

import { VideoQueryPublishStatus } from '@videos/query';

const GrpcToQueryPublishEnumMapper = new Map<
  VideoGrpcPublishStatus,
  VideoQueryPublishStatus
>();

GrpcToQueryPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PENDING,
  VideoQueryPublishStatus.PENDING,
);
GrpcToQueryPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PROCESSING,
  VideoQueryPublishStatus.PROCESSING,
);
GrpcToQueryPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PROCESSED,
  VideoQueryPublishStatus.PROCESSED,
);
GrpcToQueryPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PUBLISHED,
  VideoQueryPublishStatus.PUBLISHED,
);
GrpcToQueryPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_FAILED,
  VideoQueryPublishStatus.FAILED,
);

export { GrpcToQueryPublishEnumMapper };
