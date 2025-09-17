import { NestFactory } from '@nestjs/core';
import { KafkaOptions } from '@nestjs/microservices';

import { AppConfigService } from '@transcoder/infrastructure/config';

import { AppModule } from './app.module';

/* Make use of kafka transport here */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  await app.listen(configService.HTTP_PORT, '0.0.0.0');

  app.connectMicroservice<KafkaOptions>(configService.KAFKA_OPTIONS);
  await app.startAllMicroservices();
}

bootstrap()
  .then(() => {
    console.log(`Video transcoder service started successfully`);
  })
  .catch((error) => {
    console.log(`An Error occured while starting video-transcoder`);
    console.error(error);
    process.exit(1);
  });
