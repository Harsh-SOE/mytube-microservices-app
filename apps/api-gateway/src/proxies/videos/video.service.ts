import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { firstValueFrom } from 'rxjs';
import { Counter } from 'prom-client';
import winston from 'winston';

import { VIDEO_SERVICE_NAME, VideoServiceClient } from '@app/contracts/videos';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients/constant';
import { JwtUserPayload } from '@app/contracts/jwt';

import { REQUESTS_COUNTER } from '@gateway/infrastructure/measure';

import { CreateVideoRequestDto, UpdateVideoRequestDto } from './request';
import {
  FoundVideoRequestResponse,
  PublishedVideoRequestResponse,
  UpdatedVideoRequestResponse,
} from './response';
import {
  ClientGrpcVideoPublishEnumMapper,
  ClientGrpcVideoVisibilityEnumMapper,
  GrpcClientVideoPublishEnumMapper,
  GrpcClientVideoVisibilityEnumMapper,
} from './mappers';

@Injectable()
export class VideoService implements OnModuleInit {
  private videoService: VideoServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.VIDEO) private readonly videoClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
    @InjectMetric(REQUESTS_COUNTER) private readonly counter: Counter,
  ) {}

  onModuleInit() {
    this.videoService = this.videoClient.getService(VIDEO_SERVICE_NAME);
  }

  async createVideo(
    video: CreateVideoRequestDto,
    user: JwtUserPayload,
  ): Promise<PublishedVideoRequestResponse> {
    this.logger.log(
      'info',
      `GATEWAY::CREATE_VIDEO:: Request recieved:${JSON.stringify(video)}`,
    );

    const videoServiceVisibilityStatus =
      ClientGrpcVideoVisibilityEnumMapper.get(video.visibility);

    const videoServicePublishStatus = ClientGrpcVideoPublishEnumMapper.get(
      video.status,
    );

    if (
      videoServiceVisibilityStatus === undefined ||
      videoServicePublishStatus === undefined
    ) {
      throw new Error(`Invalid Video visibility or publish status`);
    }
    this.counter.inc();
    const response$ = this.videoService.create({
      ownerId: user.id,
      videoPublishStatus: videoServicePublishStatus,
      videoVisibilityStatus: videoServiceVisibilityStatus,
      ...video,
    });
    return await firstValueFrom(response$);
  }

  // TODO: Fix this type mismatch
  async findOneVideo(id: string): Promise<FoundVideoRequestResponse> {
    this.logger.log('info', `GATEWAY::FIND_VIDEO:: Request recieved:${id}`);

    this.counter.inc();
    const response$ = this.videoService.findOne({ id });
    const response = await firstValueFrom(response$);
    const videoPublishStatusResponse = GrpcClientVideoPublishEnumMapper.get(
      response.videoPublishStatus,
    );
    const videoVisibilityStatusResponse =
      GrpcClientVideoVisibilityEnumMapper.get(response.videoVisibilityStatus);

    if (!videoPublishStatusResponse || !videoVisibilityStatusResponse) {
      throw new Error(
        `Invalid Response from service: ${JSON.stringify(response)}`,
      );
    }
    return {
      ...response,
      videoPublishStatus: videoPublishStatusResponse,
      videoVisibilityStatus: videoVisibilityStatusResponse,
    };
  }

  async updateOneVideo(
    updateVideoDto: UpdateVideoRequestDto,
    videoId: string,
  ): Promise<UpdatedVideoRequestResponse> {
    this.logger.log(
      'info',
      `GATEWAY::UPDATE_VIDEO:: Request recieved:${JSON.stringify(updateVideoDto)}`,
    );

    const response$ = this.videoService.update({
      id: videoId,
      ...updateVideoDto,
    });
    return await firstValueFrom(response$);
  }
}
