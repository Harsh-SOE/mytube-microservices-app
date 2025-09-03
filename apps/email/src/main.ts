import { NestFactory } from '@nestjs/core';
import { KafkaOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  app.connectMicroservice<KafkaOptions>(configService.KAFKA_OPTIONS);
  await app.startAllMicroservices();
  await app.listen(configService.HTTP_PORT, '0.0.0.0');
}
bootstrap()
  .then(() => console.log(`Email service started successfully`))
  .catch((error) => {
    console.log(`An error occured while starting email service`);
    console.error(error);
    process.exit(1);
  });
