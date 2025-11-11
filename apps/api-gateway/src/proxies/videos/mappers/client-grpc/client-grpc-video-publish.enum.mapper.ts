import { VideoGrpcPublishStatus } from '@app/contracts/videos';

import { VideoRequestPublishStatus } from '../../enums';

const ClientGrpcVideoPublishEnumMapper = new Map<
  VideoRequestPublishStatus,
  VideoGrpcPublishStatus
>();

ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PENDING,
  VideoGrpcPublishStatus.GRPC_PENDING,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PROCESSING,
  VideoGrpcPublishStatus.GRPC_PROCESSING,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PROCESSED,
  VideoGrpcPublishStatus.GRPC_PROCESSED,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PUBLISHED,
  VideoGrpcPublishStatus.GRPC_PUBLISHED,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.FAILED,
  VideoGrpcPublishStatus.GRPC_FAILED,
);

export { ClientGrpcVideoPublishEnumMapper };
