import { CLIENT_PROVIDER } from '@app/clients';
import { WATCH_SERVICE_NAME, WatchServiceClient } from '@app/contracts/watch';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { WatchVideoResponse } from './response';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WatchService implements OnModuleInit {
  private watchService: WatchServiceClient;

  constructor(@Inject(CLIENT_PROVIDER.WATCH) private watchClient: ClientGrpc) {}

  onModuleInit() {
    this.watchService = this.watchClient.getService(WATCH_SERVICE_NAME);
  }

  public async watchVideo(
    videoId: string,
    userId: string,
  ): Promise<WatchVideoResponse> {
    const response$ = this.watchService.watchVideo({
      userId: userId,
      videoId: videoId,
    });
    return await firstValueFrom(response$);
  }
}
