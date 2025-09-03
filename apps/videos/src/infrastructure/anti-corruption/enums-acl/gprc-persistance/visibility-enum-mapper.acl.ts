import { VideoVisibilityStatus } from '@app/contracts/videos';
import { VideoDomainVisibiltyStatus } from '@videos/domain/enums';

const GrpcToPersistanceVisibilityEnumMapper = new Map<
  VideoVisibilityStatus,
  VideoDomainVisibiltyStatus
>();

GrpcToPersistanceVisibilityEnumMapper.set(
  0,
  VideoDomainVisibiltyStatus.PRIVATE,
);
GrpcToPersistanceVisibilityEnumMapper.set(1, VideoDomainVisibiltyStatus.PUBLIC);
GrpcToPersistanceVisibilityEnumMapper.set(
  2,
  VideoDomainVisibiltyStatus.UNLISTED,
);

export { GrpcToPersistanceVisibilityEnumMapper };
