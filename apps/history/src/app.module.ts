import { Module } from '@nestjs/common';
import { AppConfigModule } from './infrastructure/config';

@Module({
  imports: [AppConfigModule],
})
export class AppModule {}
