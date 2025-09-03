import { Injectable, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as AWS from '@aws-sdk/client-s3';
import { Readable } from 'stream';

import { CloudPreSignedUrlResponse } from '@app/contracts/cloud';
import { AwsUploadParams } from '@app/contracts/cloud';

import { CloudProviderService } from './cloud-provider-service';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class AwsCloudService
  implements OnModuleInit, CloudProviderService<AwsUploadParams>
{
  private s3Client: AWS.S3Client;

  constructor(private configService: AppConfigService) {}

  onModuleInit() {
    this.s3Client = new AWS.S3Client({
      region: this.configService.AWS_REGION,
      credentials: {
        accessKeyId: this.configService.AWS_ACCESS_KEY,
        secretAccessKey: this.configService.AWS_ACCESS_SECRET,
      },
    });
  }
  async getPreSignedUploadUrl(
    params: AwsUploadParams,
  ): Promise<CloudPreSignedUrlResponse> {
    const { Bucket, key, contentType } = params;
    console.log(`key is:${key}`);
    const uploadObjectCommand = new AWS.PutObjectCommand({
      Bucket: Bucket,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(this.s3Client, uploadObjectCommand);
    return { url };
  }

  async getFileAsNodeJSReadableStream(key: string): Promise<Readable> {
    const getObjectCommand = new AWS.GetObjectCommand({
      Bucket: this.configService.AWS_BUCKET,
      Key: key,
    });
    const data = await this.s3Client.send(getObjectCommand);

    if (!data || !data.Body || !(data.Body instanceof Readable)) {
      console.log(`Data from AWS is not a readable stream`);
      throw new RpcException('File stream not found or invalid.');
    }

    return data.Body as Readable;
  }
}
