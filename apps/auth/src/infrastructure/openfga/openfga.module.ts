import { Module } from '@nestjs/common';

import { AppConfigModule } from '@auth/config';

import { OpenfgaService } from './openfga.service';

@Module({
  providers: [OpenfgaService],
  imports: [AppConfigModule],
})
export class OpenfgaModule {}
