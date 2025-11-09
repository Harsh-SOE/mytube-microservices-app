import { NestFactory } from '@nestjs/core';
import { GrpcOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppConfigService } from './infrastructure/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);
  await app.listen(configService.SERVICE_HTTP_PORT, '0.0.0.0');
  app.connectMicroservice<GrpcOptions>(configService.GRPC_OPTIONS);
  await app.startAllMicroservices();
}
bootstrap()
  .then(() => {
    Logger.log(`Cloud microservice started successfully`);
  })
  .catch((error) => {
    Logger.error(`An Error occured while starting the cloud service`);
    Logger.error(error);
    process.exit(1);
  });
