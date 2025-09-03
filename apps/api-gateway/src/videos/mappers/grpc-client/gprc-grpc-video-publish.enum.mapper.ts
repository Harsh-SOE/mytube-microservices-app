import { VideoPublishStatus } from '@app/contracts/videos';
import { VideoRequestPublishStatus } from '../../enums';

const GrpcClientVideoPublishEnumMapper = new Map<
  VideoPublishStatus,
  VideoRequestPublishStatus
>();

GrpcClientVideoPublishEnumMapper.set(
  VideoPublishStatus.PENDING,
  VideoRequestPublishStatus.PENDING,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoPublishStatus.PROCESSING,
  VideoRequestPublishStatus.PROCESSING,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoPublishStatus.PROCESSED,
  VideoRequestPublishStatus.PROCESSED,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoPublishStatus.PUBLISHED,
  VideoRequestPublishStatus.PUBLISHED,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoPublishStatus.FAILED,
  VideoRequestPublishStatus.FAILED,
);

export { GrpcClientVideoPublishEnumMapper };
