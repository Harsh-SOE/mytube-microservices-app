import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import Stream, { PassThrough } from 'stream';

import { FileChunk } from '../types';

@Injectable()
export class ObservableToStream {
  public ConvertObservableToReadableStream(
    fileStreamObservable: Observable<FileChunk>,
    fileKey: string,
  ): Promise<{ stream: Stream; filePathKey: string }> {
    const stream = new PassThrough();

    return new Promise<{ stream: Stream; filePathKey: string }>(
      (resolve, reject) => {
        let resolved = false;

        fileStreamObservable.subscribe({
          next: (chunk: FileChunk) => {
            if (!resolved) {
              resolved = true;
              resolve({ stream, filePathKey: fileKey });
            }

            stream.write(chunk?.data);

            if (chunk?.isLast) {
              stream.end();
            }
          },
          error: (err: Error) => {
            stream.destroy(err);
            reject(err);
          },
          complete: () => {
            stream.end();
          },
        });
      },
    );
  }
}
