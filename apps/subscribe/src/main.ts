import { NestFactory } from '@nestjs/core';
import { GrpcOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { AppConfigService } from './infrastructure/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  await app.listen(configService.HTTP_PORT, '0.0.0.0');
  app.connectMicroservice<GrpcOptions>(configService.GRPC_OPTIONS);
  await app.startAllMicroservices();
}

bootstrap()
  .then(() => {
    console.log(`Subscribe service started successfully`);
  })
  .catch((error) => {
    console.error(`An Error occured while starting Subscribe service`, error);
    process.exit(1);
  });
