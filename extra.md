# likes-development-database:

# container_name: likes-development-database

# image: docker.io/bitnami/mongodb:8.0

# ports:

# - '27020:27017'

# volumes:

# - likes-development-database-volume:/bitnami/mongodb

# environment:

# MONGODB_ADVERTISED_HOSTNAME: likes-development-database

# MONGODB_ROOT_PASSWORD: harsh123

# MONGODB_REPLICA_SET_MODE: primary

# MONGODB_REPLICA_SET_NAME: rs0

# MONGODB_REPLICA_SET_KEY: replicasetkey123

# networks:

# - likes-development-database-network

# healthcheck:

# test:

# [

# 'CMD',

# 'mongosh',

# '-u',

# 'root',

# '-p',

# 'harsh123',

# '--eval',

# "db.adminCommand('ping')",

# ]

# interval: 10s

# timeout: 5s

# retries: 5

# start_period: 10s

# likes-development-database-secondary:

# container_name: likes-development-database-secondary

# image: docker.io/bitnami/mongodb:8.0

# ports:

# - '27022:27017'

# environment:

# MONGODB_ADVERTISED_HOSTNAME: likes-development-database-secondary

# MONGODB_INITIAL_PRIMARY_HOST: likes-development-database

# MONGODB_INITIAL_PRIMARY_ROOT_PASSWORD: harsh123

# MONGODB_REPLICA_SET_NAME: rs0

# MONGODB_REPLICA_SET_MODE: secondary

# MONGODB_REPLICA_SET_KEY: replicasetkey123

# networks:

# - likes-development-database-network

# healthcheck:

# test: ['CMD', 'mongosh', '--eval', "db.adminCommand('ping')"]

# interval: 10s

# timeout: 5s

# retries: 5

# start_period: 10s

# depends_on:

# likes-development-database:

# condition: service_healthy

# likes-development-database-arbiter:

# container_name: likes-development-database-arbiter

# image: docker.io/bitnami/mongodb:8.0

# ports:

# - '27023:27017'

# environment:

# MONGODB_ADVERTISED_HOSTNAME: likes-development-database-arbiter

# MONGODB_INITIAL_PRIMARY_HOST: likes-development-database

# MONGODB_REPLICA_SET_MODE: arbiter

# MONGODB_INITIAL_PRIMARY_ROOT_PASSWORD: harsh123

# MONGODB_REPLICA_SET_NAME: rs0

# MONGODB_REPLICA_SET_KEY: replicasetkey123

# networks:

# - likes-development-database-network

# healthcheck:

# test: ['CMD', 'mongosh', '--eval', "db.adminCommand('ping')"]

# interval: 10s

# timeout: 5s

# retries: 5

# start_period: 10s

# depends_on:

# likes-development-database:

# condition: service_healthy

# likes-development-database-init:

# container_name: likes-development-database-init

# image: docker.io/bitnami/mongodb:8.0

# networks:

# - likes-development-database-network

# depends_on:

# likes-development-database:

# condition: service_healthy

# command: >

# sh -c "

# sleep 10;

# mongosh --host likes-development-database:27017 --username root --password harsh123 --authenticationDatabase admin --eval '

# var cfg = {

# \_id: \"rs0\",

# members: [

# { \_id: 0, host: \"likes-development-database:27017\" },

# { \_id: 1, host: \"likes-development-database-secondary:27017\" },

# { \_id: 2, host: \"likes-development-database-arbiter:27017\", arbiterOnly: true }

# ]

# };

# rs.initiate(cfg);

# '

# "
