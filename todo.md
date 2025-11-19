// TODO: Optmize the video transcoding workflow for better scalability...

/\*

import { spawn } from 'child_process';
import { Injectable } from '@nestjs/common';
import _ as path from 'path';
import _ as fs from 'fs/promises';
import \* as fsSync from 'fs';
import { v4 as uuidv4 } from 'uuid';
import chokidar from 'chokidar';
import {
S3Client,
PutObjectCommand,
PutObjectCommandInput,
} from '@aws-sdk/client-s3';

interface TranscodeOptions {
inputUrl: string; // S3 signed URL or http(s) URL or local path
videoId: string;
bucket: string; // S3 bucket to upload segments to
s3Prefix?: string; // optional prefix/key directory in bucket (e.g. videos/{videoId}/)
segmentTimeSec?: number;
ffmpegPreset?: string;
bitrate?: string;
}

@Injectable()
export class FFmpegTranscoderAdapter {
private readonly s3: S3Client;
private readonly baseTmp = '/tmp/transcodes'; // ensure this is tmpfs in k8s for production

constructor() {
// Uses env AWS\_\* credentials or IAM role
this.s3 = new S3Client({});
}

public async transcodeToHlsAndUpload(opts: TranscodeOptions) {
const {
inputUrl,
videoId,
bucket,
s3Prefix = `videos/${videoId}/`,
segmentTimeSec = 6,
ffmpegPreset = 'veryfast',
bitrate = '2000k',
} = opts;

    // create a unique working directory
    const jobId = uuidv4();
    const workDir = path.join(this.baseTmp, `${videoId}-${jobId}`);
    await fs.mkdir(workDir, { recursive: true });

    const manifestName = `${videoId}.m3u8`;
    const segmentPattern = 'segment%05d.ts'; // zero padded
    const manifestPath = path.join(workDir, manifestName);
    const segmentPathPattern = path.join(workDir, segmentPattern);

    // spawn ffmpeg
    // sample args:
    // -i <input>
    // -c:v libx264 -preset veryfast -b:v 2000k
    // -c:a aac
    // -f hls -hls_time 6 -hls_playlist_type vod -hls_segment_filename <path>/segment%05d.ts <path>/manifest.m3u8
    const ffmpegArgs = [
      '-y',
      '-i',
      inputUrl,
      '-c:v',
      'libx264',
      '-preset',
      ffmpegPreset,
      '-b:v',
      bitrate,
      '-c:a',
      'aac',
      '-ac',
      '2',
      '-f',
      'hls',
      '-hls_time',
      String(segmentTimeSec),
      '-hls_playlist_type',
      'vod',
      '-hls_flags',
      'independent_segments', // helps with standalone segments
      '-hls_segment_filename',
      segmentPathPattern,
      manifestPath,
    ];

    const ff = spawn('ffmpeg', ffmpegArgs, { stdio: ['ignore', 'pipe', 'pipe'] });

    // hook up logging
    ff.stdout.on('data', (d) => {
      // ffmpeg rarely writes to stdout; most logs are stderr
      // optional: buffer for progress parsing
      // console.log('[ffmpeg stdout]', d.toString());
    });
    ff.stderr.on('data', (d) => {
      // You can parse progress lines from stderr if you want
      // e.g., look for "time=" lines
      // console.log('[ffmpeg stderr]', d.toString());
    });

    // watcher: upload .ts created files as they appear
    const watcher = chokidar.watch(path.join(workDir, '*.ts'), {
      awaitWriteFinish: {
        stabilityThreshold: 250, // ms
        pollInterval: 100,
      },
      persistent: true,
      ignoreInitial: true,
    });

    // concurrency control
    const maxParallelUploads = 3;
    let currentUploads = 0;
    const uploadQueue: (() => Promise<void>)[] = [];

    const enqueueUpload = (fn: () => Promise<void>) => {
      uploadQueue.push(fn);
      processQueue();
    };

    const processQueue = async () => {
      if (currentUploads >= maxParallelUploads) return;
      const job = uploadQueue.shift();
      if (!job) return;
      currentUploads++;
      try {
        await job();
      } catch (err) {
        console.error('Upload job failed', err);
      } finally {
        currentUploads--;
        // next
        processQueue();
      }
    };

    const uploadFileToS3 = async (filePath: string) => {
      const fileName = path.basename(filePath);
      const key = path.posix.join(s3Prefix, fileName);
      const body = fsSync.createReadStream(filePath);
      const params: PutObjectCommandInput = {
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: 'video/MP2T', // for .ts
      };
      await this.s3.send(new PutObjectCommand(params));
      // delete local file after upload
      try {
        await fs.unlink(filePath);
      } catch (e) {
        // ignore
      }
      console.info(`Uploaded ${fileName} -> s3://${bucket}/${key}`);
    };

    watcher.on('add', (filePath) => {
      // a new segment file appeared
      enqueueUpload(async () => {
        await uploadFileToS3(filePath);
      });
    });

    // handle ffmpeg exit
    const ffExitPromise = new Promise<void>((resolve, reject) => {
      ff.on('exit', (code, signal) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`ffmpeg exited with code ${code} signal ${signal}`));
        }
      });
      ff.on('error', (err) => reject(err));
    });

    try {
      await ffExitPromise; // wait for ffmpeg to finish
    } catch (err) {
      // make sure to close watcher and cleanup
      await watcher.close();
      // clean up partially created files
      // optionally mark the video processing as failed via message broker
      throw err;
    }

    // when ffmpeg done: upload any remaining segments (watcher handled most)
    // we should also upload the manifest and ensure all uploads finished
    // wait until queue empties
    while (uploadQueue.length > 0 || currentUploads > 0) {
      await new Promise((r) => setTimeout(r, 200));
    }

    // upload manifest file
    const manifestKey = path.posix.join(s3Prefix, manifestName);
    const manifestBody = await fs.readFile(manifestPath);
    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: manifestKey,
        Body: manifestBody,
        ContentType: 'application/vnd.apple.mpegurl',
      }),
    );
    // optionally delete local manifest
    try {
      await fs.unlink(manifestPath);
    } catch (e) {}

    // close watcher
    await watcher.close();

    // cleanup local dir
    try {
      await fs.rmdir(workDir, { recursive: true });
    } catch (e) {
      // ignore
    }

    // return the manifest S3 location (caller can publish message)
    return {
      manifestUrl: `s3://${bucket}/${manifestKey}`,
      manifestKey,
      s3Prefix,
    };

}
}

\*/
