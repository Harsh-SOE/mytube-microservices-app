import { Injectable } from '@nestjs/common';

import { IQueryPersistanceACL } from '@app/infrastructure';

import { VideoQueryModel } from '@videos/query';

import { Video } from '@peristance/videos';
import {
  PersistanceToQueryPublishEnumMapper,
  PersistanceToQueryVisibilityEnumMapper,
} from '../enums/to-query';
import { QueryToPersistancePublishEnumMapper } from '../enums/to-persistance';

@Injectable()
export class VideoQueryPeristanceACL
  implements
    IQueryPersistanceACL<
      VideoQueryModel,
      Omit<Video, 'publishedAt' | 'updatedAt'>
    >
{
  public toQueryModel(
    schema: Omit<Video, 'publishedAt' | 'updatedAt'>,
  ): VideoQueryModel {
    const videoPublishStatusForQuery = PersistanceToQueryPublishEnumMapper.get(
      schema.videoPublishStatus,
    );
    const videoVisibilityStatusForQuery =
      PersistanceToQueryVisibilityEnumMapper.get(schema.videoVisibiltyStatus);

    if (!videoPublishStatusForQuery || !videoVisibilityStatusForQuery) {
      throw new Error();
    }

    return {
      id: schema.id,
      ownerId: schema.ownerId,
      title: schema.title,
      videoFileIdentifier: schema.videoFileUrl,
      description: schema.description ?? undefined,
      videoPublishStatus: videoPublishStatusForQuery,
      videoVisibilityStatus: videoVisibilityStatusForQuery,
    };
  }
  toPersistance(
    model: VideoQueryModel,
  ): Omit<Video, 'publishedAt' | 'updatedAt'> {
    const {
      id,
      ownerId,
      title,
      videoFileIdentifier,
      videoPublishStatus,
      videoVisibilityStatus,
      description,
    } = model;
    const videoPublishStatusForPersistance =
      QueryToPersistancePublishEnumMapper.get(videoPublishStatus);
    const videoVisibilityStatusForPersistance =
      PersistanceToQueryVisibilityEnumMapper.get(videoVisibilityStatus);

    if (
      !videoPublishStatusForPersistance ||
      !videoVisibilityStatusForPersistance
    ) {
      throw new Error();
    }

    return {
      id,
      ownerId,
      title,
      description: description ?? null,
      videoFileUrl: videoFileIdentifier,
      videoPublishStatus: videoPublishStatusForPersistance,
      videoVisibiltyStatus: videoVisibilityStatusForPersistance,
    };
  }
}
