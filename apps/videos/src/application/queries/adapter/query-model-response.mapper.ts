import { Injectable } from '@nestjs/common';

import { Video } from '@peristance/videos';

import {
  PublishPersistanceToGrpcEnumMapper,
  VisibilityPersistanceToGrpcEnumMapper,
} from './enums-mappers';
import { VideoQueryModel } from '../dto/video-query.model';

@Injectable()
export class QueryModelResponseMapper {
  public toResponse(persistance: Video): VideoQueryModel {
    const videoVisibilityStatus = VisibilityPersistanceToGrpcEnumMapper.get(
      persistance.videoVisibiltyStatus,
    );
    const videoPublishStatus = PublishPersistanceToGrpcEnumMapper.get(
      persistance.videoPublishStatus,
    );

    if (
      videoPublishStatus === undefined ||
      videoVisibilityStatus === undefined
    ) {
      throw new Error(`Invalid status for publish or visibility`);
    }

    return {
      id: persistance.id,
      ownerId: persistance.ownerId,
      title: persistance.title,
      videoFileIdentifier: persistance.videoFileUrl,
      description: persistance.description ?? undefined,
      videoPublishStatus,
      videoVisibilityStatus,
    };
  }
}
