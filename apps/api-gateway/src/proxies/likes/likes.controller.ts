import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserAuthPayload } from '@app/contracts/auth';

import { GatewayJwtGuard } from '@gateway/proxies/auth/guards';
import { User } from '@gateway/proxies/auth/decorators';

import {
  VideoLikedStatusCreatedRequestResponse,
  GetLikesCountForVideo,
} from './response';
import { LikesService } from './likes.service';
import { LIKE_API } from './api';
import { VideoActionDto } from './request';

@Controller('likes')
@UseGuards(GatewayJwtGuard)
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Post(LIKE_API.LIKE_VIDEO)
  likeVideo(
    @User() loggedInUser: UserAuthPayload,
    @Query('videoId') videoId: string,
    @Body() likeStatus: VideoActionDto,
  ): Promise<VideoLikedStatusCreatedRequestResponse> {
    return this.likeService.modifyLikeStatus(
      loggedInUser.id,
      videoId,
      likeStatus,
    );
  }

  @Post(LIKE_API.GET_LIKES_FOR_VIDEO)
  getLikesCountForVideo(
    @Param('videoId') videoId: string,
  ): Promise<GetLikesCountForVideo> {
    return this.likeService.getLikesForVideo(videoId);
  }

  @Post(LIKE_API.GET_DISLIKES_FOR_VIDEO)
  getDisLikesCountForVideo(
    @Param('videoId') videoId: string,
  ): Promise<GetLikesCountForVideo> {
    return this.likeService.getLikesForVideo(videoId);
  }
}
