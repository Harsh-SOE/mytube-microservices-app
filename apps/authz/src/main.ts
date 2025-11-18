import { NestFactory } from '@nestjs/core';
import { AuthzModule } from './authz.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthzModule);
  await app.listen(process.env.port ?? 3000);
}

bootstrap()
  .then(() => {
    console.log(`AuthZ service started successfully`);
  })
  .catch((err) => {
    console.log(`An error occured while starting the authZ service`);
    console.error(err);
  });
