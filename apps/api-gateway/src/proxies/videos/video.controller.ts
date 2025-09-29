import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtUserPayload } from '@app/contracts/jwt';

import { GatewayJwtGuard } from '@gateway/infrastructure/auth';
import { User } from '@gateway/utils/decorators';

import { CreateVideoRequestDto, UpdateVideoRequestDto } from './request';
import {
  PublishedVideoRequestResponse,
  FoundVideoRequestResponse,
  UpdatedVideoRequestResponse,
} from './response';
import { VideoService } from './video.service';
import { VIDEO_API } from './api';

@Controller('videos')
@UseGuards(GatewayJwtGuard)
export class VideoController {
  constructor(private videoService: VideoService) {}

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
    @User() user: JwtUserPayload,
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
