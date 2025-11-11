import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserAuthPayload } from '@app/contracts/auth';

import { GatewayJwtGuard } from '@gateway/proxies/auth/guards';
import { User } from '@gateway/proxies/auth/decorators';

import {
  CreateVideoRequestDto,
  PreSignedUrlRequestDto,
  UpdateVideoRequestDto,
} from './request';
import {
  PublishedVideoRequestResponse,
  FoundVideoRequestResponse,
  UpdatedVideoRequestResponse,
  PreSignedUrlRequestResponse,
} from './response';
import { VideoService } from './video.service';
import { VIDEO_API } from './api';

@Controller('videos')
@UseGuards(GatewayJwtGuard)
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Post(VIDEO_API.PRESIGNED_URL_FOR_VIDEO_FILE)
  getPresignedUrl(
    @Body() FileMetaDataDto: PreSignedUrlRequestDto,
    @User('id') userId: string,
  ): Promise<PreSignedUrlRequestResponse> {
    return this.videoService.getPresignedUploadUrl(FileMetaDataDto, userId);
  }

  @Get(VIDEO_API.FIND_A_VIDEO)
  async findOneVideo(
    @Param('id') id: string,
  ): Promise<FoundVideoRequestResponse> {
    console.log(id);
    return this.videoService.findOneVideo(id);
  }

  @Post(VIDEO_API.PUBLISH_VIDEO)
  createVideo(
    @Body() createBookDto: CreateVideoRequestDto,
    @User() user: UserAuthPayload,
  ): Promise<PublishedVideoRequestResponse> {
    return this.videoService.createVideo(createBookDto, user);
  }

  @Patch(VIDEO_API.UPDATE_A_VIDEO)
  updateVideo(
    @Body() videoUpdateDto: UpdateVideoRequestDto,
    @Param('id') videoId: string,
  ): Promise<UpdatedVideoRequestResponse> {
    return this.videoService.updateOneVideo(videoUpdateDto, videoId);
  }
}
