import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  GetPresignedUrlDto,
  GetPreSignedUrlResponse,
} from '@app/contracts/videos';

import { STORAGE_PORT, StoragePort } from '@videos/application/ports';

import { GeneratePreSignedUrlCommand } from './generate-presigned-url.command';

@CommandHandler(GeneratePreSignedUrlCommand)
export class GeneratePreSignedUrlHandler
  implements ICommandHandler<GetPresignedUrlDto, GetPreSignedUrlResponse>
{
  public constructor(
    @Inject(STORAGE_PORT) private readonly storageAdapter: StoragePort,
  ) {}

  public async execute({
    fileName,
    userId,
  }: GetPresignedUrlDto): Promise<GetPreSignedUrlResponse> {
    if (!fileName) {
      fileName = `video-${new Date().toISOString()}-${userId}.mp4`;
    }

    const presignedUrl = await this.storageAdapter.getPresignedUrl(fileName);

    return {
      response: 'Presigned url generated successfully',
      fileIdentifier: presignedUrl,
    };
  }
}
