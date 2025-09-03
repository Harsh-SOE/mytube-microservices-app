import { VideoTransportPublishStatus } from '@app/contracts/videos';
import { VideoDomainPublishStatus } from '@videos/domain/enums';

const GrpcToDomainPublishEnumMapper = new Map<
  VideoTransportPublishStatus,
  VideoDomainPublishStatus
>();

GrpcToDomainPublishEnumMapper.set(0, VideoDomainPublishStatus.PENDING);
GrpcToDomainPublishEnumMapper.set(1, VideoDomainPublishStatus.PROCESSING);
GrpcToDomainPublishEnumMapper.set(2, VideoDomainPublishStatus.PROCESSED);
GrpcToDomainPublishEnumMapper.set(3, VideoDomainPublishStatus.PUBLISHED);
GrpcToDomainPublishEnumMapper.set(4, VideoDomainPublishStatus.FAILED);

export { GrpcToDomainPublishEnumMapper };
