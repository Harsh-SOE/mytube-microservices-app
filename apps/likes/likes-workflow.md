🔹 How to model it in Redis

Instead of only one set, you’ll maintain two sets per video:

video:likes:{videoId} → users who liked

video:dislikes:{videoId} → users who disliked

And still keep sharded counters for scalability:

video:likes:count:{videoId}:{shard}

video:dislikes:count:{videoId}:{shard}

🔹 Operations

1. Like

SREM video:dislikes:{videoId} userId (remove from dislikes if present)

SADD video:likes:{videoId} userId

If return = 1 → increment likes counter shard

If user was removed from dislikes → decrement dislikes counter shard

2. Unlike

SREM video:likes:{videoId} userId

If return = 1 → decrement likes counter shard

3. Dislike

SREM video:likes:{videoId} userId (remove from likes if present)

SADD video:dislikes:{videoId} userId

If return = 1 → increment dislikes counter shard

If user was removed from likes → decrement likes counter shard

4. Undislike

SREM video:dislikes:{videoId} userId

If return = 1 → decrement dislikes counter shard

🔹 Why this works

No double likes/dislikes → sets guarantee uniqueness.

No like + dislike at the same time → explicit removal from opposite set.

Scalability → counters are sharded; you don’t need to scan sets for counts.

Durability → you can periodically flush Redis sets to a DB for persistence.
