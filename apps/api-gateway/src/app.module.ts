import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { AppConfigModule } from './config/config.module';
import { VideoModule } from './videos/video.module';
import { UsersModule } from './users/users.module';
import { MeasureModule } from './measure/measure.module';
import { CloudModule } from './cloud/cloud.module';
import { ResponseTimeMiddleware } from './middlewares/response-time.middleware';
import { LogsModule } from './logs/logs.module';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './auth/auth.module';
import { GatewayJwtModule } from './jwt/jwt.module';
import { LikesModule } from './likes/likes.module';
import { AppConfigService } from './config/config.service';

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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*');
  }
}
