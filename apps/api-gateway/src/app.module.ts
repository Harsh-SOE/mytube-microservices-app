import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { VideoModule } from './proxies/videos/video.module';
import { UsersModule } from './proxies/users/users.module';
import { MeasureModule } from './infrastructure/measure';
import { AuthModule } from './proxies/auth/auth.module';
import { LikesModule } from './proxies/likes/likes.module';
import { WatchModule } from './proxies/views/views.module';
import { ResponseTimeMiddleware } from './utils/middlewares';
import { CommentsModule } from './proxies/comments/comments.module';
import { AppHealthModule } from './infrastructure/health/health.module';
import { LOGGER_PORT } from './application/ports';
import { WinstonLoggerAdapter } from './infrastructure/logger';

@Module({
  imports: [
    AppConfigModule,
    VideoModule,
    UsersModule,
    MeasureModule,
    AuthModule,
    LikesModule,
    WatchModule,
    CommentsModule,
    AppHealthModule,
  ],
  providers: [{ provide: LOGGER_PORT, useClass: WinstonLoggerAdapter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*');
  }
}
