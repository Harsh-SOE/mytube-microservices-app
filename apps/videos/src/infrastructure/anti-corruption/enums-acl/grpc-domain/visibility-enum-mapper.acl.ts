import { VideoVisibilityStatus } from '@app/contracts/videos';
import { VideoDomainVisibiltyStatus } from '@videos/domain/enums';

const GrpcToDomainVisibilityEnumMapper = new Map<
  VideoVisibilityStatus,
  VideoDomainVisibiltyStatus
>();

GrpcToDomainVisibilityEnumMapper.set(0, VideoDomainVisibiltyStatus.PRIVATE);
GrpcToDomainVisibilityEnumMapper.set(1, VideoDomainVisibiltyStatus.PUBLIC);
GrpcToDomainVisibilityEnumMapper.set(2, VideoDomainVisibiltyStatus.UNLISTED);

export { GrpcToDomainVisibilityEnumMapper };
