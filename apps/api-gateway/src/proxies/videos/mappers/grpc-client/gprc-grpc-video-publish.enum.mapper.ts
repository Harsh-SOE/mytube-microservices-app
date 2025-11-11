import { VideoGrpcPublishStatus } from '@app/contracts/videos';

import { VideoRequestPublishStatus } from '../../enums';

const GrpcClientVideoPublishEnumMapper = new Map<
  VideoGrpcPublishStatus,
  VideoRequestPublishStatus
>();

GrpcClientVideoPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PENDING,
  VideoRequestPublishStatus.PENDING,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PROCESSING,
  VideoRequestPublishStatus.PROCESSING,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PROCESSED,
  VideoRequestPublishStatus.PROCESSED,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_PUBLISHED,
  VideoRequestPublishStatus.PUBLISHED,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoGrpcPublishStatus.GRPC_FAILED,
  VideoRequestPublishStatus.FAILED,
);

export { GrpcClientVideoPublishEnumMapper };
