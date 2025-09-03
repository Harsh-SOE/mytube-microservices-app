-- KEYS[1] = liked by users set key (vlu:{videoId})
-- KEYS[2] = disliked by users set key (vdu:{videoId})
-- KEYS[3] = video likes counter key (vlc:{videoId}:{shard})
-- KEYS[4] = video dislikes counter key (vdc:{videoId}:{shard})
-- ARGV[1] = userId
local fromDisLike = redis.call('SREM', KEYS[2], ARGV[1])
if fromDisLike == 1 then
	redis.call('INCRBY', KEYS[4], -1)
end
local added = redis.call('SADD', KEYS[1], ARGV[1])
if added == 1 then
  redis.call('INCRBY', KEYS[3], 1)
  return 1
end
return 0

