import { VideoPublishStatus } from '@app/contracts/videos';
import { VideoPersistancePublishStatus } from '@peristance/videos';

const GrpcToPersistancePublishEnumMapper = new Map<
  VideoPublishStatus,
  VideoPersistancePublishStatus
>();

GrpcToPersistancePublishEnumMapper.set(
  0,
  VideoPersistancePublishStatus.PENDING,
);
GrpcToPersistancePublishEnumMapper.set(
  1,
  VideoPersistancePublishStatus.PROCESSING,
);
GrpcToPersistancePublishEnumMapper.set(
  2,
  VideoPersistancePublishStatus.PROCESSED,
);
GrpcToPersistancePublishEnumMapper.set(
  3,
  VideoPersistancePublishStatus.PUBLISHED,
);
GrpcToPersistancePublishEnumMapper.set(4, VideoPersistancePublishStatus.FAILED);

export { GrpcToPersistancePublishEnumMapper };
