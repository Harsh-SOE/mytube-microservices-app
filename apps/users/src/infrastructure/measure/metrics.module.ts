import { Global, Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { totalRequestForUser } from './custom/metrics';

@Global()
@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: { enabled: true },
    }),
  ],
  providers: [totalRequestForUser],
  exports: [totalRequestForUser],
})
export class MeasureModule {}
