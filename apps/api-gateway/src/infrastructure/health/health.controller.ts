import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class AppHealthController {
  @Get('monitor')
  healthCheck() {
    return {
      status: 'healthy',
    };
  }
}
