import { Inject, Injectable } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import * as fsStream from 'fs';
import * as fs from 'fs/promises';
import { Job } from 'bullmq';
import path from 'path';

import { STORAGE_PORT } from '@transcoder/application/ports';
import {
  LOGGER_PORT,
  LoggerPort,
  StoragePort,
} from '@transcoder/application/ports';
import { SEGMENT_UPLOADER_QUEUE } from '@transcoder/utils/constants';

@Injectable()
@Processor(SEGMENT_UPLOADER_QUEUE)
export class BullSegmentUploadWorker extends WorkerHost {
  constructor(
    @Inject(STORAGE_PORT) private readonly storagePort: StoragePort,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {
    super();
  }

  async process(job: Job<{ filePath: string }>): Promise<any> {
    const { filePath } = job.data;

    this.logger.info(`Uploading '${filePath}' to Storage`);

    const fileStream = fsStream.createReadStream(filePath);
    const fileName = path.basename(filePath);
    const videoId = path.basename(path.dirname(filePath));

    this.logger.info(`Saving file: ${fileName} with id: ${videoId} to Storage`);

    await this.storagePort.uploadTranscodedVideoFileAsStream(
      fileStream,
      videoId,
      fileName,
    );

    if (path.extname(fileName) === '.m3u8') {
      this.logger.alert(`Index file uploaded successfully...`);
      await fs.rm(`/@streamforge/transcoded-videos/${videoId}`, {
        recursive: true,
        force: true,
      });
    }
  }
}
