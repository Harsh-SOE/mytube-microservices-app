import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GrpcAppExceptionFilter } from '@app/utils';

import {
  GetPresignedUrlDto,
  GetPreSignedUrlResponse,
  VideoCreateDto,
  VideoFindDto,
  VideoFoundResponse,
  VideoPublishedResponse,
  VideoServiceController,
  VideoServiceControllerMethods,
  VideosFoundResponse,
  VideosHealthCheckRequest,
  VideosHealthCheckResponse,
  VideoUpdatedResponse,
  VideoUpdateDto,
} from '@app/contracts/videos';

import { GrpcService } from './grpc.service';

@UseFilters(GrpcAppExceptionFilter)
@VideoServiceControllerMethods()
@Controller()
export class GrpcController implements VideoServiceController {
  constructor(private readonly videoService: GrpcService) {}

  check(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: VideosHealthCheckRequest,
  ):
    | Promise<VideosHealthCheckResponse>
    | Observable<VideosHealthCheckResponse>
    | VideosHealthCheckResponse {
    return { status: 1 }; // 1 = SERVING
  }

  getPresignedUrlForFileUpload(
    getPresignedUrlDto: GetPresignedUrlDto,
  ):
    | Promise<GetPreSignedUrlResponse>
    | Observable<GetPreSignedUrlResponse>
    | GetPreSignedUrlResponse {
    return this.videoService.generatePreSignedUrl(getPresignedUrlDto);
  }

  save(
    videoCreateDto: VideoCreateDto,
  ):
    | Promise<VideoPublishedResponse>
    | Observable<VideoPublishedResponse>
    | VideoPublishedResponse {
    return this.videoService.create(videoCreateDto);
  }

  findAll(): Promise<VideosFoundResponse> {
    return this.videoService.findAll();
  }

  findOne(videoFindDto: VideoFindDto): Promise<VideoFoundResponse> {
    return this.videoService.findOne(videoFindDto);
  }

  update(videoUpdateDto: VideoUpdateDto): Promise<VideoUpdatedResponse> {
    return this.videoService.update(videoUpdateDto);
  }

  remove(id: string) {
    return this.videoService.remove(id);
  }
}
