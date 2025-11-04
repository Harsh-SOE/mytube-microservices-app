import { getShardFor } from '@app/counters';

export function getShardKey(
  videoId: string,
  userId: string,
  shard: number = 64,
) {
  return getShardFor(videoId + userId, shard);
}

export function getVideoLikesCounterKey(videoId: string, shardNum: number) {
  return `videoLikesCounter:${videoId}:${shardNum}`;
}

export function getVideoDislikeCounterKey(videoId: string, shardNum: number) {
  return `videoDislikesCounter:${videoId}:${shardNum}`;
}

export function getUserLikesSetKey(videoId: string) {
  return `videoLikedByUsers:${videoId}`;
}

export function getUserDislikesSetKey(videoId: string) {
  return `videoDislikedByUsers:${videoId}`;
}
