import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GetPreSignedUrlResponse } from '@app/contracts/videos';

import {
  LOGGER_PORT,
  STORAGE_PORT,
  StoragePort,
} from '@videos/application/ports';
import { WinstonLoggerAdapter } from '@videos/infrastructure/logger';

import { GeneratePreSignedUrlVideoCommand } from './generate-presigned-url-video.command';

@CommandHandler(GeneratePreSignedUrlVideoCommand)
export class GeneratePreSignedUrlVideoHandler
  implements
    ICommandHandler<GeneratePreSignedUrlVideoCommand, GetPreSignedUrlResponse>
{
  public constructor(
    @Inject(STORAGE_PORT) private readonly storageAdapter: StoragePort,
    @Inject(LOGGER_PORT) private readonly loggerPort: WinstonLoggerAdapter,
  ) {}

  public async execute({
    generatePreSignedUrlDto,
  }: GeneratePreSignedUrlVideoCommand): Promise<GetPreSignedUrlResponse> {
    let fileName = generatePreSignedUrlDto.fileName;
    const userId = generatePreSignedUrlDto.userId;
    if (!fileName) {
      fileName = `video-${new Date().toISOString()}-${userId}.mp4`;
    }

    const presignedUrlResponse =
      await this.storageAdapter.getPresignedUrlForVideo(fileName);

    const response = {
      response: 'Presigned url generated successfully',
      presignedUrl: presignedUrlResponse.presignedUrl,
      fileIdentifier: presignedUrlResponse.fileIdentifier,
    };

    this.loggerPort.info(`Response is: `, response);

    return response;
  }
}
