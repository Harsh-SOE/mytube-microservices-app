import { VideoGrpcPublishStatus } from '@app/contracts/videos';

import { VideoQueryPublishStatus } from '@videos/query';

const QueryToGrpcPublishEnumMapper = new Map<
  VideoQueryPublishStatus,
  VideoGrpcPublishStatus
>();

QueryToGrpcPublishEnumMapper.set(
  VideoQueryPublishStatus.PENDING,
  VideoGrpcPublishStatus.GRPC_PENDING,
);
QueryToGrpcPublishEnumMapper.set(
  VideoQueryPublishStatus.PROCESSING,
  VideoGrpcPublishStatus.GRPC_PROCESSING,
);
QueryToGrpcPublishEnumMapper.set(
  VideoQueryPublishStatus.PROCESSED,
  VideoGrpcPublishStatus.GRPC_PROCESSED,
);
QueryToGrpcPublishEnumMapper.set(
  VideoQueryPublishStatus.PUBLISHED,
  VideoGrpcPublishStatus.GRPC_PUBLISHED,
);
QueryToGrpcPublishEnumMapper.set(
  VideoQueryPublishStatus.FAILED,
  VideoGrpcPublishStatus.GRPC_FAILED,
);

export { QueryToGrpcPublishEnumMapper };
