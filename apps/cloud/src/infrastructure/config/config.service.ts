/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import { join } from 'path';

import { CLOUD_PACKAGE_NAME, CLOUD_PROVIDER } from '@app/contracts/cloud';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get SERVICE_HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SERVICE_PORT');
  }

  get AWS_REGION() {
    return this.configService.getOrThrow<string>('AWS_REGION');
  }

  get AWS_ACCESS_KEY() {
    return this.configService.getOrThrow<string>('AWS_ACCESS_KEY');
  }

  get AWS_ACCESS_SECRET() {
    return this.configService.getOrThrow<string>('AWS_ACCESS_SECRET');
  }

  get AWS_BUCKET() {
    return this.configService.getOrThrow<string>('AWS_BUCKET');
  }

  get CLOUD_PROVIDER() {
    return this.configService.getOrThrow<CLOUD_PROVIDER>('CLOUD_PROVIDER');
  }

  get CLOUDINARY_CLOUD_NAME() {
    return this.configService.getOrThrow<string>('CLOUDINARY_CLOUD_NAME');
  }

  get CLOUDINARY_API_KEY() {
    return this.configService.getOrThrow<string>('CLOUDINARY_API_KEY');
  }

  get CLOUDINARY_API_SECRET() {
    return this.configService.getOrThrow<string>('CLOUDINARY_API_SECRET');
  }

  get CLOUDINARY_UPLOAD_FOLDER() {
    return this.configService.getOrThrow<string>('CLOUDINARY_UPLOAD_FOLDER');
  }

  get GCP_BUCKET() {
    return this.configService.getOrThrow<string>('GCP_BUCKET');
  }

  get GRPC_OPTIONS(): GrpcOptions {
    const options: GrpcOptions = {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(__dirname, '../proto/cloud.proto'),
          join(__dirname, '../proto/health.proto'),
        ],
        package: [CLOUD_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        url: `0.0.0.0:${this.SERVICE_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
    return options;
  }

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }
}
