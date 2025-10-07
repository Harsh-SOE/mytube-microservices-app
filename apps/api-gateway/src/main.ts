import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { GatewayExceptionFilter } from './utils/filter/gateway.filter';
import { AppConfigService } from './infrastructure/config/config.service';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GatewayExceptionFilter());
  const configService = app.get(AppConfigService);

  app.use(
    session({
      secret: configService.EXPRESS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  await app.listen(configService.PORT, '0.0.0.0');
}
bootstrap()
  .then(() => console.log(`Api gateway started successfully`))
  .catch((error) => {
    console.log(`An error occured while starting gateway`);
    console.error(error);
    process.exit(1);
  });
