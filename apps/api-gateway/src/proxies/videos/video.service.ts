import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { firstValueFrom } from 'rxjs';
import { Counter } from 'prom-client';

import { VIDEO_SERVICE_NAME, VideoServiceClient } from '@app/contracts/videos';
import { CLIENT_PROVIDER } from '@app/clients/constant';
import { UserAuthPayload } from '@app/contracts/auth';

import { LOGGER_PORT, LoggerPort } from '@gateway/application/ports';
import { REQUESTS_COUNTER } from '@gateway/infrastructure/measure';

import {
  CreateVideoRequestDto,
  PreSignedUrlRequestDto,
  UpdateVideoRequestDto,
} from './request';
import {
  FoundVideoRequestResponse,
  PreSignedUrlRequestResponse,
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
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
    @InjectMetric(REQUESTS_COUNTER) private readonly counter: Counter,
  ) {}

  onModuleInit() {
    this.videoService = this.videoClient.getService(VIDEO_SERVICE_NAME);
  }

  async getPresignedUploadUrl(
    preSignedUrlRequestDto: PreSignedUrlRequestDto,
    userId: string,
  ): Promise<PreSignedUrlRequestResponse> {
    this.counter.inc();

    const result$ = this.videoService.getPresignedUrlForFileUpload({
      ...preSignedUrlRequestDto,
      userId,
    });
    return await firstValueFrom(result$);
  }

  async createVideo(
    video: CreateVideoRequestDto,
    user: UserAuthPayload,
  ): Promise<PublishedVideoRequestResponse> {
    this.logger.info(`Request recieved:${JSON.stringify(video)}`);

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
    const response$ = this.videoService.save({
      ownerId: user.id,
      videoPublishStatus: videoServicePublishStatus,
      videoVisibilityStatus: videoServiceVisibilityStatus,
      ...video,
    });
    return await firstValueFrom(response$);
  }

  // TODO: Fix this type mismatch
  async findOneVideo(id: string): Promise<FoundVideoRequestResponse> {
    this.logger.info(`Request recieved:${id}`);

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
      id: response.id,
      title: response.title,
      videoFileIdentifier: response.videoFileIdentifier,
      videoPublishStatus: videoPublishStatusResponse,
      videoVisibilityStatus: videoVisibilityStatusResponse,
      description: response.description,
    };
  }

  async updateOneVideo(
    updateVideoDto: UpdateVideoRequestDto,
    videoId: string,
  ): Promise<UpdatedVideoRequestResponse> {
    this.logger.info(`Request recieved:${JSON.stringify(updateVideoDto)}`);

    const response$ = this.videoService.update({
      id: videoId,
      ...updateVideoDto,
    });
    return await firstValueFrom(response$);
  }
}
