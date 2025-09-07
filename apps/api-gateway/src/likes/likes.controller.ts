import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtUserPayload } from '@app/contracts/jwt';

import {
  VideoLikedStatusCreatedRequestResponse,
  GetLikesCountForVideo,
} from './response';
import { LikesService } from './likes.service';
import { LIKE_API } from './api';
import { User } from '../decorators';
import { GatewayJwtGuard } from '../jwt/guards';
import { VideoLikeStatusCreatedDto } from './request';

@Controller('likes')
@UseGuards(GatewayJwtGuard)
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Post(LIKE_API.LIKE_VIDEO)
  likeVideo(
    @User() loggedInUser: JwtUserPayload,
    @Query('videoId') videoId: string,
    @Body() likeStatus: VideoLikeStatusCreatedDto,
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
