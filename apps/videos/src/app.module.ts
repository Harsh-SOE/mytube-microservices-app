import { Module } from '@nestjs/common';
import { VideosModule } from '@videos/application/videos';
import { PersistanceModule } from '@videos/infrastructure/persistance';
import { AppConfigModule } from '@videos/config';
import { MeasureModule } from '@videos/infrastructure/measure';
import { LogsModule } from '@videos/infrastructure/logs';

@Module({
  imports: [
    VideosModule,
    PersistanceModule,
    AppConfigModule,
    MeasureModule,
    LogsModule,
  ],
})
export class AppModule {}
