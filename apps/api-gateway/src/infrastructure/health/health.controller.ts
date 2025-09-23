import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthController {
  @Get('monitor')
  healthCheck() {
    return {
      status: 'healthy',
    };
  }
}
