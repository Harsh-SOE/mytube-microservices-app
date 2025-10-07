A distributed counter is a way of counting something (like likes, views, or events) across multiple machines/nodes in a distributed system without having a single centralized bottleneck.

Instead of one database row holding the counter value (which would become a hotspot under heavy load), the counter is sharded/partitioned or maintained in multiple places and then aggregated when needed.

Why do we need distributed counters?

If millions of users are hitting the same "like" button, a single row update in a SQL/NoSQL database becomes a bottleneck.

Writes (increments) can overwhelm the storage system, causing contention and degraded performance.

Distributed counters spread the load across many nodes while still allowing you to get an approximate or eventual-accurate count.

How distributed counters work

Sharded counters

Split the counter into N shards.

Each shard is stored in a different partition/machine (e.g., Redis, Cassandra, DynamoDB).

Increments update a random shard.

To read the counter, sum all shard values.

Example: Google App Engine’s counter implementation.

Approximate counters (probabilistic)

Use algorithms like HyperLogLog or Count-Min Sketch to keep approximate counts with low memory usage.

Often used for very high scale where exact precision is less important.

Event-driven counters

Every increment is published as an event (Kafka, Pulsar).

A consumer aggregates counts asynchronously and stores them in a database or cache.

Reads may show slightly stale counts but scale extremely well.

CRDT-based counters (Conflict-free Replicated Data Types)

In distributed databases like Riak or Redis with CRDT support.

Multiple nodes can increment independently, and their states converge without conflicts.

Guarantees strong eventual consistency.

Example: Likes system with Redis + Kafka

Users click "like" → event goes to Kafka.

Redis maintains per-partition counters (shards).

A background service periodically aggregates counters into the main database.

Reads can come directly from Redis for near-real-time results.

👉 In short:
A distributed counter is a scalable way of handling counters in systems where updates are extremely frequent, by splitting responsibility across multiple machines, using sharding, event streaming, or CRDTs.
