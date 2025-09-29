import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppConfigModule, AppConfigService } from '@auth/infrastructure/config';

@Module({
  imports: [
    AppConfigModule,
    JwtModule.registerAsync({
      inject: [AppConfigService],
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => ({
        privateKey: configService.JWT_PRIVATE_KEY,
        signOptions: {
          algorithm: 'RS256',
          expiresIn: configService.JWT_ACCESS_TOKEN_EXPIRY,
        },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class AppJwtModule {}
