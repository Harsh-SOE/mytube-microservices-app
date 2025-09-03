-- KEYS[1] = disliked by users set key (vdu:{videoId})
-- KEYS[2] = liked by users set key (vlu:{videoId})
-- KEYS[3] = video dislikes counter key (vdc:{videoId}:{shard})
-- KEYS[4] = video likes counter key (vlc:{videoId}:{shard})
-- ARGV[1] = userId
local fromLike = redis.call('SREM', KEYS[2], ARGV[1])
if fromLike == 1 then
	redis.call('INCRBY', KEYS[4], -1)
end
local added = redis.call('SADD', KEYS[1], ARGV[1])
if added == 1 then
  redis.call('INCRBY', KEYS[3], 1)
  return 1
end
return 0