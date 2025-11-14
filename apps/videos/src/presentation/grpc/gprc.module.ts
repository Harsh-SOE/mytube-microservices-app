import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { videoQueryHandler } from '@videos/application/queries';
import { videoCommandHandlers } from '@videos/application/commands';

import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [CqrsModule, InfrastructureModule],
  controllers: [GrpcController],
  providers: [GrpcService, ...videoCommandHandlers, ...videoQueryHandler],
})
export class GrpcModule {}
