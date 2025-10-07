import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { GatewayJwtGuard } from '@gateway/infrastructure/passport';

import { PreSignedUrlRequestDto, StreamFileRequestDto } from './request';
import { PreSignedUrlRequestResponse } from './response';
import { CloudService } from './cloud.service';
import { CLOUD_API } from './api';

@Controller('cloud')
@UseGuards(GatewayJwtGuard)
export class CloudController {
  constructor(private cloudService: CloudService) {}

  @Post(CLOUD_API.PRESIGNED_URL)
  uploadToCloud(
    @Body() FileMetaDataDto: PreSignedUrlRequestDto,
  ): Promise<PreSignedUrlRequestResponse> {
    return this.cloudService.getPresignedUploadUrl(FileMetaDataDto);
  }

  @Get(CLOUD_API.GET_FILE_AS_STREAM)
  streamFile(@Body() streamFileDto: StreamFileRequestDto) {
    return this.cloudService.streamFile(streamFileDto);
  }
}
