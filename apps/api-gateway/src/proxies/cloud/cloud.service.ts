import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import winston from 'winston';
import { Counter } from 'prom-client';
import { firstValueFrom } from 'rxjs';

import { CLOUD_SERVICE_NAME, CloudServiceClient } from '@app/contracts/cloud';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients/constant';

import { REQUESTS_COUNTER } from '@gateway/infrastructure/measure';

import { PreSignedUrlRequestDto, StreamFileRequestDto } from './request';
import { PreSignedUrlRequestResponse } from './response';

@Injectable()
export class CloudService implements OnModuleInit {
  private cloudService: CloudServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.CLOUD) private readonly cloudClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
    @InjectMetric(REQUESTS_COUNTER) private readonly counter: Counter,
  ) {}

  onModuleInit() {
    this.cloudService = this.cloudClient.getService(CLOUD_SERVICE_NAME);
  }

  async getPresignedUploadUrl(
    preSignedUrlRequestDto: PreSignedUrlRequestDto,
  ): Promise<PreSignedUrlRequestResponse> {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::PRESIGNED_URL:: Request recieved:${preSignedUrlRequestDto.dir}`,
    );

    const result$ = this.cloudService.getPresignedUrl(preSignedUrlRequestDto);
    return await firstValueFrom(result$);
  }

  async streamFile(streamFileRequestDto: StreamFileRequestDto) {
    this.logger.log(
      'info',
      `GATEWAY::STREAM_FILE:: Request recieved:${JSON.stringify(streamFileRequestDto)}`,
    );

    const result$ =
      this.cloudService.getFileAsNodeJsReadableStreamObservable(
        streamFileRequestDto,
      );
    return await firstValueFrom(result$);
  }
}
