import { Module } from '@nestjs/common';

import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { requestCounter, requestTimer } from './custom/metrics';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  providers: [requestCounter, requestTimer],
  exports: [requestCounter, requestTimer],
})
export class MeasureModule {}
