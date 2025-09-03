import { Injectable, InternalServerErrorException } from '@nestjs/common';

import {
  CloudPresignedUrlDto,
  UploadToCloudDto,
  AwsUploadParams,
  GCPUploadParams,
  CloudinaryUploadParams,
  CLOUD_PROVIDER,
} from '@app/contracts/cloud';

import { AppConfigService } from '../config/config.service';

@Injectable()
export class CloudParamsFactory {
  constructor(private configService: AppConfigService) {}

  /**
   * Determines and returns the completely populated appropriate file
   *  upload parameters based on the selected cloud provider strategy.
   * The method uses metadata from the client and the configuration to
   * construct parameters for AWS, Cloudinary, or GCP.
   *
   *
   * If invalid configuration was detected, then this factory throws an error.
   *
   * @param fileMetaData - Metadata of the file to be uploaded, provided by the client.
   * @returns An object containing the upload parameters specific to the selected cloud provider.
   * @throws InternalServerErrorException if an invalid cloud provider is selected.
   */

  // INFO: Can Change this behaviour to select AWS by default if invalid config was provided.
  getFileUploadParamsForSelectedStrategy(
    fileMetaData: CloudPresignedUrlDto, // actual data provided by the client
    // overrides: Partial<UploadToCloudDto>,
  ): UploadToCloudDto {
    console.log(`Setting params based on the provider`);
    const provider = this.configService.CLOUD_PROVIDER;
    console.log(provider);
    switch (provider) {
      case CLOUD_PROVIDER.AWS: {
        console.log(`Using AWS`);
        const awsUploadParams: AwsUploadParams = {
          provider: CLOUD_PROVIDER.AWS,
          Bucket: this.configService.AWS_BUCKET,
          contentType: fileMetaData.mimeType,
          key: fileMetaData.dir
            ? `uploads/${fileMetaData.dir}/${fileMetaData.fileName}`
            : `uploads/${fileMetaData.fileName}`,
        };
        return awsUploadParams;
      }
      case CLOUD_PROVIDER.Cloudinary: {
        console.log(`Using Cloudinary`);
        const result: CloudinaryUploadParams = {
          provider: CLOUD_PROVIDER.Cloudinary,
          folder: this.configService.CLOUDINARY_UPLOAD_FOLDER,
        } as CloudinaryUploadParams;
        return result;
      }
      case CLOUD_PROVIDER.GCP: {
        console.log(`Using GCP`);
        const GcpUploadParams: GCPUploadParams = {
          provider: CLOUD_PROVIDER.GCP,
          Bucket: this.configService.GCP_BUCKET,
          name: fileMetaData.fileName,
        };
        return GcpUploadParams;
      }
      default: {
        throw new InternalServerErrorException(
          `Invalid Cloud provider was selected`,
        );
      }
    }
  }
}
