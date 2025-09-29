-- KEYS[1] video with id: videoId watched by users set key (vwu:{videoId})
-- KEYS[2] video with id: videoId  watch counter key (vwc:{videoId})
-- ARG[1] userId
local watch = redis.call('SADD', KEYS[1], ARGV[1])
if watch == 1 then
  redis.call('INCRBY', KEYS[2], 1)
  return 1
end
return 0