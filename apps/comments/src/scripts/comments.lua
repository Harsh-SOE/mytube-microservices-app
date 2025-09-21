-- KEYS[1] video with id: videoId on which user commented on set key (vcu:{videoId})
-- KEYS[2] video with id: videoId  on which user commented on counter key (vwc:{videoId})
-- ARGV[1] userId
local comment = redis.call('SADD', KEYS[1], ARGV[1])
if comment == 1 then
  redis.call('INCRBY', KEYS[2], 1)
  return 1
end
return 0