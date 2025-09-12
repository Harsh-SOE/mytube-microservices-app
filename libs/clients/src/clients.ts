export enum AUTH_PATTERN {
  SIGNUP = 'auth.signup',
  LOGIN = 'auth.login',
  VERIFY_TOKEN = 'auth.update-details',
  CHANGE_PASSWORD = 'auth.change-password',
  DELETE_USER_CREDENTIAL = 'auth.delete-credentials',
}

export enum CLOUD_PATTERN {
  PRESIGNED_URL = 'cloud.pre-signed-url',
}

export enum EMAIL_CLIENT {
  USER_CREATED = 'email.user-created',
}

export enum WATCH_CLIENT {
  USER_CREATED = 'watch.user-created',
}

export enum LIKE_PATTERN {
  CREATE_LIKE = 'like.create',
  FIND_ALL_LIKE = 'like.find-all',
  FIND_ONE_LIKE = 'like.find-one',
  UPDATE_LIKE_STATUS = 'like.update-likestatus',
  DELETE_ONE_LIKE = 'like.delete-like',
}

export enum SAGA_PATTERN {
  USER_SIGNUP = 'user.signup',
}

export enum USER_PATTERN {
  USER_SIGNUP = 'user.signup',
  LOGIN = 'user.login',
  UPDATE_USER_PROFILE = 'user.update',
  FIND_USER = 'user.find-one',
  FIND_USER_BY_ID = 'user.find-by-id',
  FIND_ALL_USERS = 'user.find-all',
  DELETE_USER = 'user.remove',
  GET_PASSWORD_HASH = 'user.password-hash',
}

export enum VIDEO_PATTERN {
  CREATE = 'video.create',
  UPDATE = 'video.update',
  FIND_ONE = 'video.find-one',
  FIND_ALL = 'video.find-all',
  DELETE = 'video.remove',
}

export enum VIDEO_TRANSCODER_PATTERN {
  TRANSCODE_VIDEO = 'video.transcode',
}
