import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  LikeServiceControllerMethods,
  LikeServiceController,
  LikesHealthCheckRequest,
  LikesHealthCheckResponse,
  DislikesFindCountForAVideoDto,
  DislikesFindCountForAVideoResponse,
  LikeModifiedStatusForVideoResponse,
  LikesFindCountForAVideoDto,
  LikesFindCountForAVideoResponse,
  ModifyLikeStatusForVideoDto,
  LikeFoundForVideoResponse,
  LikesFindForUserForVideoDto,
} from '@app/contracts/likes';
import { GrpcAppExceptionFilter } from '@app/utils';

import { LikeService } from './likes.service';

@UseFilters(GrpcAppExceptionFilter)
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

  modifyLikeStatusForVideo(
    request: ModifyLikeStatusForVideoDto,
  ):
    | Promise<LikeModifiedStatusForVideoResponse>
    | Observable<LikeModifiedStatusForVideoResponse>
    | LikeModifiedStatusForVideoResponse {
    return this.likeService.modifyVideoLikeStatus(request);
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
