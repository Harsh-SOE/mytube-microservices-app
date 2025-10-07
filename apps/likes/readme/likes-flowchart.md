flowchart TD
%% User Action
A[User Views Video] --> B[Redis Shard Increment<br/>video:{videoId}:{shard}<br/>Lua Script (atomic)]

    %% Event Publishing
    B --> C[Publish Event to Kafka<br/>video_viewed:{videoId}]

    %% Aggregator Layer
    C --> D[Aggregator Service<br/>- Reads from Kafka<br/>- Writes to Redis Stream (durable queue)]

    %% Batch Processing / DB
    D --> E[Stream Processor / Batch Job<br/>- Reads from Redis Stream<br/>- Aggregates per video<br/>- Writes batch to DB]
    E --> F[Database<br/>- VideoMetrics table<br/>- total views / likes / watch hours<br/>- Eventually consistent]

    %% Real-time reads
    B --- G[UI Reads / Analytics]
    G -->|Sum Shards| H[Near Real-time Metrics from Redis]

    %% Notes
    classDef note fill:#f9f,stroke:#333,stroke-width:1px,color:#000;
    N1[Notes:<br/>1. Redis Shards prevent hot keys and allow atomic increments.<br/>2. Kafka ensures event durability and decouples systems.<br/>3. Redis Stream acts as a buffer for burst traffic.<br/>4. Batch processing reduces DB load and ensures eventual consistency.<br/>5. UI can read from Redis for near-real-time metrics.]:::note
    F --> N1
