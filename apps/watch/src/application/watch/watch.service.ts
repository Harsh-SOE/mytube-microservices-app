import { Injectable } from '@nestjs/common';

@Injectable()
export class WatchService {
  saveUserInDatabase(userPayload: any) {
    console.log(`userPayload is ${JSON.stringify(userPayload)}`);
  }
}
