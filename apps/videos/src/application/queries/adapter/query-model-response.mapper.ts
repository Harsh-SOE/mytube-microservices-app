import { Injectable } from '@nestjs/common';
import { Video } from '@peristance/videos';
import { VideoQueryModel } from '../dto/video-query.model';
import {
  PublishPeristanceToGrpcEnum,
  VisibilityPersistanceToGrpcEnumMapper,
} from './enums-mappers';
import {
  VideoPublishStatus,
  VideoVisibilityStatus,
} from '@app/contracts/videos';

@Injectable()
export class QueryModelResponseMapper {
  public toResponse(persistance: Video): VideoQueryModel {
    return {
      id: persistance.id,
      ownerId: persistance.ownerId,
      title: persistance.title,
      videoFileUrl: persistance.videoFileUrl,
      description: persistance.description ?? undefined,
      videoPublishStatus: PublishPeristanceToGrpcEnum.get(
        persistance.videoPublishStatus,
      ) as VideoPublishStatus,
      videoVisibiltyStatus: VisibilityPersistanceToGrpcEnumMapper.get(
        persistance.videoVisibiltyStatus,
      ) as VideoVisibilityStatus,
    };
  }
}
