import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Logger } from 'winston';
import { Counter } from 'prom-client';
import { firstValueFrom } from 'rxjs';

import { LIKE_SERVICE_NAME, LikeServiceClient } from '@app/contracts/likes';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients';

import {
  GetLikesCountForVideo,
  GetDislikesCountForVideo,
  VideoLikedStatusCreatedRequestResponse,
} from './response';
import { REQUESTS_COUNTER } from '../measure/custom/constants';
import { ClientGrpcLikeStatusEnumMapper } from './mappers';
import { VideoLikeStatusCreatedDto } from './request';

@Injectable()
export class LikesService implements OnModuleInit {
  private likeService: LikeServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.LIKE) private likeClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private logger: Logger,
    @InjectMetric(REQUESTS_COUNTER) private counter: Counter,
  ) {}

  onModuleInit() {
    this.likeService = this.likeClient.getService(LIKE_SERVICE_NAME);
  }

  async modifyLikeStatus(
    userId: string,
    videoId: string,
    videoLikeStatusCreatedDto: VideoLikeStatusCreatedDto,
  ): Promise<VideoLikedStatusCreatedRequestResponse> {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::LIKE_CREATE_ONE:: Request recieved:${userId}`,
    );

    const likeStatusForService = ClientGrpcLikeStatusEnumMapper.get(
      videoLikeStatusCreatedDto.likeStatus,
    );

    if (!likeStatusForService) {
      throw new Error(`Invalid like status`);
    }

    const response$ = this.likeService.modifyLikeStatusForVideo({
      userId,
      videoId,
      likeStatus: likeStatusForService,
    });
    return await firstValueFrom(response$);
  }

  async getLikesForVideo(videoId: string): Promise<GetLikesCountForVideo> {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::LIKE_UPDATE_STATUS:: Request recieved:${videoId}`,
    );

    const response$ = this.likeService.getLikesCountForVideo({
      videoId,
    });
    return await firstValueFrom(response$);
  }

  async getDislikesForVideo(
    videoId: string,
  ): Promise<GetDislikesCountForVideo> {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::LIKE_UPDATE_STATUS:: Request recieved:${videoId}`,
    );

    const response$ = this.likeService.getDislikesCountForVideo({
      videoId,
    });
    return await firstValueFrom(response$);
  }
}
