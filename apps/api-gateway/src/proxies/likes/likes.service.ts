import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { firstValueFrom } from 'rxjs';

import { LIKE_SERVICE_NAME, LikeServiceClient } from '@app/contracts/likes';
import { CLIENT_PROVIDER } from '@app/clients';

import { REQUESTS_COUNTER } from '@gateway/infrastructure/measure';
import { LOGGER_PORT, LoggerPort } from '@gateway/application/ports';

import {
  GetLikesCountForVideo,
  GetDislikesCountForVideo,
  VideoLikedStatusCreatedRequestResponse,
} from './response';
import { ClientGrpcLikeStatusEnumMapper } from './mappers';
import { VideoActionDto } from './request';

@Injectable()
export class LikesService implements OnModuleInit {
  private likeService: LikeServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.LIKE) private likeClient: ClientGrpc,
    @InjectMetric(REQUESTS_COUNTER) private counter: Counter,
    @Inject(LOGGER_PORT) private logger: LoggerPort,
  ) {}

  onModuleInit() {
    this.likeService = this.likeClient.getService(LIKE_SERVICE_NAME);
  }

  async modifyLikeStatus(
    userId: string,
    videoId: string,
    videoLikeStatusCreatedDto: VideoActionDto,
  ): Promise<VideoLikedStatusCreatedRequestResponse> {
    this.counter.inc();

    this.logger.info(`Request recieved:${userId}`);

    const likeStatusForService = ClientGrpcLikeStatusEnumMapper.get(
      videoLikeStatusCreatedDto.likeStatus,
    );

    // TODO: Rectify the undefined case...
    if (likeStatusForService === undefined) {
      throw new Error(`Invalid like status`);
    }

    const response$ = this.likeService.videoLikeAction({
      userId,
      videoId,
      reaction: likeStatusForService,
    });
    return await firstValueFrom(response$);
  }

  async getLikesForVideo(videoId: string): Promise<GetLikesCountForVideo> {
    this.counter.inc();

    this.logger.info(`Request recieved:${videoId}`);

    const response$ = this.likeService.getLikesCountForVideo({
      videoId,
    });
    return await firstValueFrom(response$);
  }

  async getDislikesForVideo(
    videoId: string,
  ): Promise<GetDislikesCountForVideo> {
    this.counter.inc();

    this.logger.info(`Request recieved:${videoId}`);

    const response$ = this.likeService.getDislikesCountForVideo({
      videoId,
    });
    return await firstValueFrom(response$);
  }
}
