import { Injectable } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ObservableLogger {
  logObservable<T>(observable: Observable<T>) {
    return observable.pipe(
      tap({
        next: () => {
          console.info(`[TAP] Observable emitted NEXT`);
        },
        error: (err) => {
          console.error(`[TAP] Observable emitted ERROR`, err as Error);
        },
        complete: () => {
          console.info(`[TAP] Observable emitted COMPLETE`);
        },
      }),
    );
  }
}
