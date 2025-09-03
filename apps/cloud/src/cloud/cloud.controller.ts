import { Controller } from '@nestjs/common';
import { CloudService } from './cloud.service';

import {
  CloudHealthCheckRequest,
  CloudHealthCheckResponse,
  CloudPresignedUrlDto,
  CloudPreSignedUrlResponse,
  CloudServiceController,
  CloudServiceControllerMethods,
  FileChunk,
  GetFileAsNodeJSReadableStreamObservableDto,
} from '@app/contracts/cloud';
import { Observable } from 'rxjs';

@CloudServiceControllerMethods()
@Controller()
export class CloudController implements CloudServiceController {
  constructor(private readonly cloudService: CloudService) {}

  check(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: CloudHealthCheckRequest,
  ):
    | Promise<CloudHealthCheckResponse>
    | Observable<CloudHealthCheckResponse>
    | CloudHealthCheckResponse {
    return { status: 1 }; // 1 = SERVING
  }

  getPresignedUrl(
    fileMetaData: CloudPresignedUrlDto,
  ): Promise<CloudPreSignedUrlResponse> {
    return this.cloudService.generatePreSignedUrl(fileMetaData);
  }

  getFileAsNodeJsReadableStreamObservable(
    getFileAsNodeJSReadableStreamObservableDto: GetFileAsNodeJSReadableStreamObservableDto,
  ): Observable<FileChunk> {
    return this.cloudService.getFileAsNodeJSReadableStreamForGrpc(
      getFileAsNodeJSReadableStreamObservableDto,
    );
  }
}
