import { VideoTransportPublishStatus } from '@app/contracts/videos';
import { VideoRequestPublishStatus } from '../../enums';

const ClientGrpcVideoPublishEnumMapper = new Map<
  VideoRequestPublishStatus,
  VideoTransportPublishStatus
>();

ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PENDING,
  VideoTransportPublishStatus.TRANSPORT_PENDING,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PROCESSING,
  VideoTransportPublishStatus.TRANSPORT_PROCESSING,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PROCESSED,
  VideoTransportPublishStatus.TRANSPORT_PROCESSED,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.PUBLISHED,
  VideoTransportPublishStatus.TRANSPORT_PUBLISHED,
);
ClientGrpcVideoPublishEnumMapper.set(
  VideoRequestPublishStatus.FAILED,
  VideoTransportPublishStatus.TRANSPORT_FAILED,
);

export { ClientGrpcVideoPublishEnumMapper };
