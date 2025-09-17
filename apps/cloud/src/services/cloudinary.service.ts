import { Injectable, OnModuleInit } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import {
  CloudPreSignedUrlResponse,
  StreamFileToCloudResponse,
} from '@app/contracts/cloud';
import { CloudinaryUploadParams } from '@app/contracts/cloud';

import { CloudProviderService } from './cloud-provider-service';
import { AppConfigService } from '../config/config.service';
import Stream, { Readable } from 'stream';

@Injectable()
export class CloudinaryService
  implements CloudProviderService<CloudinaryUploadParams>, OnModuleInit
{
  constructor(private ConfigService: AppConfigService) {}
  onModuleInit() {
    cloudinary.config({
      cloud_name: this.ConfigService.CLOUDINARY_CLOUD_NAME,
      api_key: this.ConfigService.CLOUDINARY_API_KEY,
      api_secret: this.ConfigService.CLOUDINARY_API_SECRET,
    });
  }
  async getPreSignedUploadUrl(
    params: CloudinaryUploadParams,
  ): Promise<CloudPreSignedUrlResponse> {
    // upload to cloudinary here...
    const { folder, filePath } = params;
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return { url: result.secure_url };
  }

  getFileAsNodeJSReadableStream(key: string): Promise<Readable> {
    throw new Error('Method not implemented.');
  }

  streamFileToCloud(
    key: string,
    fileStream: Stream,
    contentType: string,
  ): Promise<StreamFileToCloudResponse> {
    throw new Error('Method not implemented.');
  }
}
