import { NestFactory } from '@nestjs/core';
import { AggregatorModule } from './app.module';
import { KafkaOptions } from '@nestjs/microservices';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AggregatorModule);
  const configService = app.get(AppConfigService);
  app.connectMicroservice<KafkaOptions>(configService.CLIENT_OPTIONS);
  await app.startAllMicroservices();
  await app.listen(configService.HTTP_PORT, '0.0.0.0');
}
bootstrap()
  .then(() => {
    console.log(`Aggregator service started successfully`);
  })
  .catch(() => {
    console.log(`An error occured while starting the aggregator service`);
  });
