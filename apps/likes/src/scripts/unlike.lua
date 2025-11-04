-- KEYS[1] = liked by users set key (videoLikedByUsers:{videoId})
-- KEYS[2] = video likes counter key (videoLikesCounter:{videoId}:{shard})
-- ARGV[1] = userId
local removed = redis.call('SREM', KEYS[1], ARGV[1])
if removed == 1 then
  redis.call('INCRBY', KEYS[2], -1)
  return 1
end
return 0
