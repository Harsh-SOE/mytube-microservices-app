import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  LikeServiceControllerMethods,
  LikeServiceController,
  LikesHealthCheckRequest,
  LikesHealthCheckResponse,
  DislikesFindCountForAVideoDto,
  DislikesFindCountForAVideoResponse,
  LikesFindCountForAVideoDto,
  LikesFindCountForAVideoResponse,
  LikeFoundForVideoResponse,
  LikesFindForUserForVideoDto,
  VideoLikeActionDto,
  LikeActionResponse,
} from '@app/contracts/likes';

import { LikeService } from './grpc.service';
import { GrpcFilter } from '../filters';

@UseFilters(GrpcFilter)
@LikeServiceControllerMethods()
@Controller()
export class LikesController implements LikeServiceController {
  constructor(private readonly likeService: LikeService) {}

  check(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: LikesHealthCheckRequest,
  ):
    | Promise<LikesHealthCheckResponse>
    | Observable<LikesHealthCheckResponse>
    | LikesHealthCheckResponse {
    return { status: 1 }; // 1 = SERVING
  }

  videoLikeAction(
    request: VideoLikeActionDto,
  ):
    | Promise<LikeActionResponse>
    | Observable<LikeActionResponse>
    | LikeActionResponse {
    return this.likeService.videoLikeAction(request);
  }

  getLikesCountForVideo(
    request: LikesFindCountForAVideoDto,
  ):
    | Promise<LikesFindCountForAVideoResponse>
    | Observable<LikesFindCountForAVideoResponse>
    | LikesFindCountForAVideoResponse {
    return this.likeService.getLikesCountForVideo(request);
  }
  getDislikesCountForVideo(
    request: DislikesFindCountForAVideoDto,
  ):
    | Promise<DislikesFindCountForAVideoResponse>
    | Observable<DislikesFindCountForAVideoResponse>
    | DislikesFindCountForAVideoResponse {
    return this.likeService.getDislikesCountForVideo(request);
  }

  findLikeOfUserForAVideo(
    request: LikesFindForUserForVideoDto,
  ):
    | Promise<LikeFoundForVideoResponse>
    | Observable<LikeFoundForVideoResponse>
    | LikeFoundForVideoResponse {
    return this.likeService.findLikeForUserForVideo(request);
  }
}
