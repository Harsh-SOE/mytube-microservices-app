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

import { StorageService } from './storage.service';

@CloudServiceControllerMethods()
@Controller()
export class StorageController implements CloudServiceController {
  constructor(private readonly cloudService: StorageService) {}

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
