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

  /**
   * Retrieves a pre-signed URL for accessing cloud storage resources.
   *
   * @param getPresignedUrlDto - Data transfer object containing parameters required to generate the pre-signed URL.
   * @returns A pre-signed URL response, which may be returned as a Promise, Observable, or direct value.
   */
  getPresignedUrl(
    getPresignedUrlDto: GetPresignedUrlDto,
  ):
    | Promise<CloudPreSignedUrlResponse>
    | Observable<CloudPreSignedUrlResponse>
    | CloudPreSignedUrlResponse {
    return this.cloudService.generatePreSignedUrl(getPresignedUrlDto);
  }

  /**
   * Downloads a file as a stream of chunks.
   *
   * @param request - The DTO containing information required to download the file as a stream.
   * @returns An Observable emitting `FileChunk` objects representing parts of the file.
   */
  downloadFileAsStream(
    request: DownloadFileAsStreamDto,
  ): Observable<FileChunk> {
    return this.cloudService.downloadFileAsStream(request);
  }

  /**
   * Uploads a file to the cloud storage.
   *
   * @param request - An observable emitting the file data to be uploaded, encapsulated in an `UploadFileDto`.
   * @returns A response indicating the result of the upload operation, which can be a `Promise`, an `Observable`, or a direct `StreamFileToCloudResponse`.
   */
  uploadFile(
    request: Observable<UploadFileDto>,
  ):
    | Promise<StreamFileToCloudResponse>
    | Observable<StreamFileToCloudResponse>
    | StreamFileToCloudResponse {
    return this.cloudService.uploadFile(request);
  }
}
