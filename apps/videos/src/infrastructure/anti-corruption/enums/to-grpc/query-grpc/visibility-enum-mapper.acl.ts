import { VideoGrpcVisibilityStatus } from '@app/contracts/videos';

import { VideoQueryVisibiltyStatus } from '@videos/query';

const QueryToGrpcVisibilityEnumMapper = new Map<
  VideoQueryVisibiltyStatus,
  VideoGrpcVisibilityStatus
>();

QueryToGrpcVisibilityEnumMapper.set(
  VideoQueryVisibiltyStatus.PRIVATE,
  VideoGrpcVisibilityStatus.GRPC_PRIVATE,
);
QueryToGrpcVisibilityEnumMapper.set(
  VideoQueryVisibiltyStatus.PUBLIC,
  VideoGrpcVisibilityStatus.GRPC_PUBLIC,
);
QueryToGrpcVisibilityEnumMapper.set(
  VideoQueryVisibiltyStatus.UNLISTED,
  VideoGrpcVisibilityStatus.GRPC_UNLISTED,
);

export { QueryToGrpcVisibilityEnumMapper };
