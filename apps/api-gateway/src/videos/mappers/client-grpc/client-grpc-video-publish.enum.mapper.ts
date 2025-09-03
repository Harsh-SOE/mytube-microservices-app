import { VideoPublishStatus } from '@app/contracts/videos';
import { VideoRequestPublishStatus } from '../../enums';

const ClientGrpcVideoPublishEnumMapper = new Map<
  VideoRequestPublishStatus,
  VideoPublishStatus
>();

ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PENDING,
  VideoPublishStatus.PENDING,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PROCESSING,
  VideoPublishStatus.PROCESSING,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PROCESSED,
  VideoPublishStatus.PROCESSED,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PUBLISHED,
  VideoPublishStatus.PUBLISHED,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.FAILED,
  VideoPublishStatus.FAILED,
);

export { ClientGrpcVideoPublishEnumMapper };
