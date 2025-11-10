import { Module } from '@nestjs/common';

import {
  BUFFER_PORT,
  CACHE_PORT,
  DATABASE_PORT,
  MESSAGE_BROKER,
} from '@likes/application/ports';
import {
  AppConfigService,
  AppConfigModule,
} from '@videos/infrastructure/config';
import { VideoEventHandler } from '@videos/application/events';
import { RedisCacheAdapter } from '@videos/infrastructure/cache/adapters';
import { VideoCommandRepositoryAdapter } from '@videos/infrastructure/repository/adapters';
import { RedisStreamBufferAdapter } from '@videos/infrastructure/buffer/adapters';
import { KafkaMessageBrokerAdapter } from '@videos/infrastructure/message-broker/adapters';

import { MessageController } from './message.controller';
import { MessageHandlerService } from './message.service';

@Module({
  imports: [AppConfigModule],
  controllers: [MessageController],
  providers: [
    MessageHandlerService,
    AppConfigService,
    { provide: DATABASE_PORT, useClass: VideoCommandRepositoryAdapter },
    { provide: CACHE_PORT, useClass: RedisCacheAdapter },
    { provide: MESSAGE_BROKER, useClass: KafkaMessageBrokerAdapter },
    { provide: BUFFER_PORT, useClass: RedisStreamBufferAdapter },
    ...VideoEventHandler,
  ],
})
export class MessageModule {}
