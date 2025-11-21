export enum VIDEO_API {
  PRESIGNED_URL_FOR_VIDEO_FILE = 'video/presign',
  PUBLISH_VIDEO = 'video',
  FIND_A_VIDEO = 'video/:id',
  UPDATE_A_VIDEO = 'video/meta/:id',
}

export enum VIDEO_API_VERSION {
  V1 = '1',
  V2 = '2',
}
