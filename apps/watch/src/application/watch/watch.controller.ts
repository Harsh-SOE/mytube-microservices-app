import { WATCH_CLIENT } from '@app/clients';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { WatchService } from './watch.service';

@Controller()
export class WatchController {
  constructor(private readonly watchService: WatchService) {}

  @EventPattern(WATCH_CLIENT.USER_CREATED)
  saveUserInWatchService(@Payload() userPayload: any) {
    this.watchService.saveUserInDatabase(userPayload);
  }
}
