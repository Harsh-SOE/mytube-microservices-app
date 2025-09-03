import { Module } from '@nestjs/common';
import Redis from 'ioredis';
import { AppConfigService } from '../config/config.service';
import { AppConfigModule } from '../config/config.module';
import * as fs from 'fs';
import { join } from 'path';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: 'LIKES_CACHE_CLIENT',
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        const redisClient = new Redis({
          host: configService.CACHE_HOST,
          port: configService.CACHE_PORT,
        });
        redisClient.on('connecting', () => {
          console.log('Redis connecting...');
        });
        redisClient.on('connect', () => {
          console.log('✅ Redis connected');
        });
        redisClient.on('error', (error) => {
          console.log('❌ Redis error:', error);
        });

        const likeScript = fs.readFileSync(
          join(__dirname, '../scripts/like.lua'),
          'utf8',
        );

        redisClient.defineCommand('videoLikesCountIncr', {
          numberOfKeys: 4,
          lua: likeScript,
        });

        const unlikeScript = fs.readFileSync(
          join(__dirname, '../scripts/unlike.lua'),
          'utf8',
        );

        redisClient.defineCommand('videoLikesCountDecr', {
          numberOfKeys: 2,
          lua: unlikeScript,
        });

        const dislikeScript = fs.readFileSync(
          join(__dirname, '../scripts/dislike.lua'),
          'utf8',
        );

        redisClient.defineCommand('videoDislikesCountIncr', {
          numberOfKeys: 4,
          lua: dislikeScript,
        });

        const undislikeScript = fs.readFileSync(
          join(__dirname, '../scripts/undislike.lua'),
          'utf8',
        );

        redisClient.defineCommand('videoDislikesCountDecr', {
          numberOfKeys: 2,
          lua: undislikeScript,
        });

        return redisClient;
      },
    },
  ],
  exports: ['LIKES_CACHE_CLIENT'],
})
export class CacheModule {}
