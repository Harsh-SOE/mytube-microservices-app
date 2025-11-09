import { RpcException } from '@nestjs/microservices';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Readable } from 'stream';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import {
  UploadResult,
  UploadOptions,
  StoragePort,
  LOGGER_PORT,
  LoggerPort,
} from '@videos/application/ports';
import { AppConfigService } from '@videos/infrastructure/config';

@Injectable()
export class AwsS3StorageAdapter implements OnModuleInit, StoragePort {
  private s3Client: S3Client;

  public constructor(
    private readonly configService: AppConfigService,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {}

  public onModuleInit() {
    this.s3Client = new S3Client({
      region: this.configService.AWS_REGION,
      credentials: {
        accessKeyId: this.configService.AWS_ACCESS_KEY,
        secretAccessKey: this.configService.AWS_ACCESS_SECRET,
      },
    });
  }

  public async getPresignedUrl(
    filePathKey: string,
    expiresIn?: number,
  ): Promise<string> {
    const putObjectCommand = new PutObjectCommand({
      Key: filePathKey,
      Bucket: this.configService.AWS_BUCKET,
    });

    return await getSignedUrl(this.s3Client, putObjectCommand, { expiresIn });
  }

  public async downloadFileAsStream(key: string): Promise<Readable> {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.configService.AWS_BUCKET,
      Key: key,
    });
    const data = await this.s3Client.send(getObjectCommand);

    if (!data || !data.Body) {
      throw new RpcException('File stream not found or invalid.');
    }

    const stream = data.Body as Readable;
    return stream;
  }

  public async uploadFileAsStream(
    fileStream: Readable,
    key: string,
    options?: UploadOptions,
  ): Promise<UploadResult> {
    const uploader = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.configService.AWS_BUCKET,
        Key: key,
        Body: fileStream,
        ContentType: options?.contentType,
      },
      queueSize: options?.multipart?.concurrency,
      partSize: options?.multipart?.partSizeBytes,
      leavePartsOnError: !!options?.resumable,
    });

    uploader.on('httpUploadProgress', (progress) => {
      console.log(`Uploaded: ${progress.loaded}/${progress.total} bytes`);
    });

    const aborter = options?.abortSignal;
    if (aborter) {
      aborter.addEventListener('abort', () => {
        uploader
          .abort()
          .then(() => console.log('Upload aborted cleanly.'))
          .catch((err) => console.error('Error while aborting:', err));
      });
    }
    await uploader.done();

    return { key };
  }
}
