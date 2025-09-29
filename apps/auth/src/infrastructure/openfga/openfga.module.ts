import { Module } from '@nestjs/common';

import { AppConfigModule } from '@auth/infrastructure/config';

import { OpenfgaService } from './openfga.service';

@Module({
  providers: [OpenfgaService],
  imports: [AppConfigModule],
})
export class OpenfgaModule {}
