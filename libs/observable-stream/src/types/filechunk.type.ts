export interface FileChunk {
  data: Uint8Array;
  size: number;
  isLast: boolean;
}
