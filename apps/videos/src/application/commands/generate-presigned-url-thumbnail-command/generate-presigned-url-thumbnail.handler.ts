import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GetPreSignedUrlResponse } from '@app/contracts/videos';

import {
  LOGGER_PORT,
  STORAGE_PORT,
  StoragePort,
} from '@videos/application/ports';
import { WinstonLoggerAdapter } from '@videos/infrastructure/logger';

import { GeneratePreSignedUrlThumbnailCommand } from './generate-presigned-url-thumbnail.command';

@CommandHandler(GeneratePreSignedUrlThumbnailCommand)
export class GeneratePreSignedUrlThumbnailHandler
  implements
    ICommandHandler<
      GeneratePreSignedUrlThumbnailCommand,
      GetPreSignedUrlResponse
    >
{
  public constructor(
    @Inject(STORAGE_PORT) private readonly storageAdapter: StoragePort,
    @Inject(LOGGER_PORT) private readonly loggerPort: WinstonLoggerAdapter,
  ) {}

  public async execute({
    generatePreSignedUrlDto,
  }: GeneratePreSignedUrlThumbnailCommand): Promise<GetPreSignedUrlResponse> {
    let fileName = generatePreSignedUrlDto.fileName;
    const userId = generatePreSignedUrlDto.userId;
    if (!fileName) {
      fileName = `video-${new Date().toISOString()}-${userId}.mp4`;
    }

    const presignedUrlResponse =
      await this.storageAdapter.getPresignedUrlForThumbnail(fileName);

    const response = {
      response: 'Presigned url generated successfully',
      presignedUrl: presignedUrlResponse.presignedUrl,
      fileIdentifier: presignedUrlResponse.fileIdentifier,
    };

    this.loggerPort.info(`Response is: `, response);

    return response;
  }
}
