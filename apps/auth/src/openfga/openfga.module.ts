import { Module } from '@nestjs/common';

import { OpenfgaService } from './openfga.service';
import { AppConfigModule } from '../config/config.module';

@Module({
  providers: [OpenfgaService],
  imports: [AppConfigModule],
})
export class OpenfgaModule {}
