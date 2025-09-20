import { CLIENT_PROVIDER } from '@app/clients';
import { WATCH_SERVICE_NAME, WatchServiceClient } from '@app/contracts/watch';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class WatchService implements OnModuleInit {
  private watchService: WatchServiceClient;

  constructor(@Inject(CLIENT_PROVIDER.WATCH) private watchClient: ClientGrpc) {}

  onModuleInit() {
    this.watchService = this.watchClient.getService(WATCH_SERVICE_NAME);
  }

  public watchVideo(videoId: string, userId: string) {
    return this.watchService.watchVideo({ userId: userId, videoId: videoId });
  }
}
