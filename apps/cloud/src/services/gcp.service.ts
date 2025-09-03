import { GCPUploadParams } from '@app/contracts/cloud';

import { CloudProviderService } from './cloud-provider-service';
import { Readable } from 'stream';

export class GCPService implements CloudProviderService<GCPUploadParams> {
  getPreSignedUploadUrl(
    params: GCPUploadParams,
  ): Promise<{ url?: string; key?: string }> {
    console.log(params);
    throw new Error('Method not implemented.');
  }

  getFileAsNodeJSReadableStream(key: string): Promise<Readable> {
    throw new Error('Method not implemented.');
  }
}
