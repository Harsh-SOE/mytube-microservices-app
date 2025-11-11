import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import passport from 'passport';

import { AppModule } from './app.module';
import { AppConfigService } from './infrastructure/config/config.service';
import { GatewayExceptionFilter } from './persentation/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);

  app.useGlobalFilters(new GatewayExceptionFilter());

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

  app.use(passport.initialize());
  app.use(passport.session());

  // passport.serializeUser((user: any, done) => {
  //   done(null, user);
  // });

  // passport.deserializeUser((user: any, done) => {
  //   done(null, user);
  // });

  await app.listen(configService.PORT, '0.0.0.0');
}
bootstrap()
  .then(() => console.log(`Api gateway started successfully`))
  .catch((error) => {
    console.log(`An error occured while starting gateway`);
    console.error(error);
    process.exit(1);
  });
