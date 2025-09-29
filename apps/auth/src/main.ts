import { NestFactory } from '@nestjs/core';
import { GrpcOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { AppConfigService } from './infrastructure/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);
  app.connectMicroservice<GrpcOptions>(configService.GRPC_OPTIONS);
  await app.startAllMicroservices();
  await app.listen(configService.HTTP_PORT, '0.0.0.0');
  console.log(`Service started successfully`);
}

bootstrap()
  .then(() => console.log(`Auth service started successfully`))
  .catch((error) => {
    console.log(`An error occured while starting auth service`);
    console.error(error);
    process.exit(1);
  });
