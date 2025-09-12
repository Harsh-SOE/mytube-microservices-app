import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcOptions, KafkaOptions } from '@nestjs/microservices';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);
  app.connectMicroservice<GrpcOptions>(configService.SERVICE_OPTIONS);
  app.connectMicroservice<KafkaOptions>(
    configService.SERVICE_MESSAGE_CONSUMER_OPTIONS,
  );
  await app.startAllMicroservices();
  await app.listen(configService.HTTP_PORT, '0.0.0.0');
}
bootstrap()
  .then(() => console.log(`Watch service started successfully`))
  .catch((error) => {
    console.log(`An error occured while starting watch service`);
    console.error(error);
  });
