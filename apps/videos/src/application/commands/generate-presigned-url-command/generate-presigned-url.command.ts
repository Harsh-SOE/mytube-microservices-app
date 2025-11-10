import { GetPresignedUrlDto } from '@app/contracts/videos';

export class GeneratePreSignedUrlCommand {
  public constructor(
    public readonly generatePreSignedUrlDto: GetPresignedUrlDto,
  ) {}
}
