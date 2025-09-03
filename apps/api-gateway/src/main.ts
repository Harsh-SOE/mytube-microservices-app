import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { GatewayExceptionFilter } from './filter/gateway.filter';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GatewayExceptionFilter());
  const configService = app.get(AppConfigService);
  await app.listen(configService.PORT, '0.0.0.0');
}
bootstrap()
  .then(() => console.log(`Api gateway started successfully`))
  .catch((error) => {
    console.log(`An error occured while starting gateway`);
    console.error(error);
    process.exit(1);
  });
