import { VideoTransportPublishStatus } from '@app/contracts/videos';
import { VideoRequestPublishStatus } from '../../enums';

const GrpcClientVideoPublishEnumMapper = new Map<
  VideoTransportPublishStatus,
  VideoRequestPublishStatus
>();

GrpcClientVideoPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_PENDING,
  VideoRequestPublishStatus.PENDING,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_PROCESSING,
  VideoRequestPublishStatus.PROCESSING,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_PROCESSED,
  VideoRequestPublishStatus.PROCESSED,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_PUBLISHED,
  VideoRequestPublishStatus.PUBLISHED,
);
GrpcClientVideoPublishEnumMapper.set(
  VideoTransportPublishStatus.TRANSPORT_FAILED,
  VideoRequestPublishStatus.FAILED,
);

export { GrpcClientVideoPublishEnumMapper };
