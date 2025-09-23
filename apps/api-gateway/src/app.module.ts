import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { redisStore } from 'cache-manager-redis-yet';
import { AppConfigModule, AppConfigService } from './infrastructure/config';
import { VideoModule } from './proxies/videos/video.module';
import { UsersModule } from './proxies/users/users.module';
import { MeasureModule } from './infrastructure/measure';
import { CloudModule } from './proxies/cloud/cloud.module';
import { LogsModule } from './infrastructure/logs';
import { AuthModule } from './proxies/auth/auth.module';
import { GatewayJwtModule } from './infrastructure/jwt';
import { LikesModule } from './proxies/likes/likes.module';
import { WatchModule } from './proxies/watch/watch.module';
import { ResponseTimeMiddleware } from './infrastructure/middlewares';
import { CommentsModule } from './proxies/comments/comments.module';
import { HealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [
    AppConfigModule,
    VideoModule,
    UsersModule,
    MeasureModule,
    CloudModule,
    CacheModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.REDIS_HOST,
            port: configService.REDIS_PORT,
          },
          ttl: 600,
        }),
      }),
      isGlobal: true,
    }),
    MeasureModule,
    LogsModule,
    AuthModule,
    GatewayJwtModule,
    LikesModule,
    WatchModule,
    CommentsModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*');
  }
}
