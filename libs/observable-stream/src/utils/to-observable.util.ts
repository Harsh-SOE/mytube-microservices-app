import { Injectable } from '@nestjs/common';
import { fromEvent, map, merge, Observable, takeUntil } from 'rxjs';
import Stream from 'stream';

import { FileChunk } from '../types';

@Injectable()
export class StreamToObservable {
  public convertStreamToObservableFromEvent(
    fileStream: Stream,
  ): Observable<FileChunk> {
    const data$ = fromEvent(fileStream, 'data').pipe(
      map((chunk: Buffer) => ({
        data: chunk,
        size: chunk.length,
        isLast: false,
      })),
    );

    const end$ = fromEvent(fileStream, 'end').pipe(
      map(() => ({
        data: Buffer.alloc(0),
        size: 0,
        isLast: true,
      })),
    );

    const error$ = fromEvent(fileStream, 'error').pipe(
      map((err: Error) => {
        throw err;
      }),
    );

    return merge(data$, end$, error$).pipe(takeUntil(end$));
  }

  public convertStreamToObservableCustomObservable(
    fileStream: Stream,
  ): Observable<FileChunk> {
    return new Observable<FileChunk>((observer) => {
      const onData = (chunk: Buffer) => {
        observer.next({
          data: chunk,
          size: chunk.length,
          isLast: false,
        });
      };

      const onEnd = () => {
        observer.next({ data: Buffer.alloc(0), size: 0, isLast: true });
        observer.complete();
      };

      const onError = (error: Error) => {
        observer.error(error);
      };

      fileStream.on('data', onData);
      fileStream.on('end', onEnd);
      fileStream.on('error', onError);

      return () => {
        fileStream.off('data', onData);
        fileStream.off('end', onEnd);
        fileStream.off('error', onError);
      };
    });
  }
}
