import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';
import { GrpcOptions } from '@nestjs/microservices';

async function bootstrap() {
  console.log(`SAGA service is starting`);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  app.connectMicroservice<GrpcOptions>(configService.GRPC_OPTIONS);
  await app.listen(configService.HTTP_PORT, '0.0.0.0');
  await app.startAllMicroservices();
}
bootstrap()
  .then(() => {
    console.log(`SAGA Service started successfully`);
  })
  .catch((error) => {
    console.log(`An error occured while starting SAGA service`);
    console.error(error);
    process.exit(1);
  });
