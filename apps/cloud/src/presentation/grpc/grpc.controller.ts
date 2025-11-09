import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  CloudPreSignedUrlResponse,
  CloudServiceController,
  CloudServiceControllerMethods,
  DownloadFileAsStreamDto,
  FileChunk,
  GetPresignedUrlDto,
  StreamFileToCloudResponse,
  UploadFileDto,
} from '@app/contracts/cloud';

import { GrpcService } from './grpc.service';

@CloudServiceControllerMethods()
@Controller()
export class GrpcController implements CloudServiceController {
  constructor(private readonly cloudService: GrpcService) {}

  getPresignedUrl(
    getPresignedUrlDto: GetPresignedUrlDto,
  ):
    | Promise<CloudPreSignedUrlResponse>
    | Observable<CloudPreSignedUrlResponse>
    | CloudPreSignedUrlResponse {
    return this.cloudService.generatePreSignedUrl(getPresignedUrlDto);
  }

  downloadFileAsStream(
    request: DownloadFileAsStreamDto,
  ): Observable<FileChunk> {
    return this.cloudService.downloadFileAsStream(request);
  }

  uploadFile(
    request: Observable<UploadFileDto>,
  ):
    | Promise<StreamFileToCloudResponse>
    | Observable<StreamFileToCloudResponse>
    | StreamFileToCloudResponse {
    return this.cloudService.uploadFile(request);
  }
}
