import { Module } from '@nestjs/common';
import { CommentsCacheService } from './cache.service';
import { AppConfigModule } from '../../config/config.module';

@Module({
  imports: [AppConfigModule],
  providers: [CommentsCacheService],
  exports: [CommentsCacheService],
})
export class CommentsCacheModule {}
