import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './infrastructure/config/config.service';
import { KafkaOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);
  app.connectMicroservice<KafkaOptions>(configService.SERVICE_OPTION);
  await app.startAllMicroservices();
  await app.listen(configService.HTTP_PORT, '0.0.0.0');
}
bootstrap()
  .then(() => {
    console.log(`Comment aggrgator service started successfully`);
  })
  .catch((error) => {
    console.log(
      `An error occured while starting the Comment aggrgator service`,
    );
    console.error(error);
    process.exit(1);
  });
