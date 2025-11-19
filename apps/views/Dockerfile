FROM node:24-alpine AS base

WORKDIR /@streamforge

RUN apk add --no-cache curl
RUN curl -fL https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.21/grpc_health_probe-linux-amd64 -o /usr/local/bin/grpc_health_probe
RUN chmod +x /usr/local/bin/grpc_health_probe
RUN apk del curl

COPY package.json yarn.lock ./

FROM base AS build-dependencies

RUN yarn install --frozen-lockfile --production=false

FROM base AS builder

COPY --from=build-dependencies /@streamforge/node_modules ./node_modules

COPY apps/views ./apps/views
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx prisma generate --schema ./apps/views/prisma/schema.prisma

RUN npx nest build views

FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /@streamforge/node_modules ./node_modules

RUN chmod +x apps/views/scripts/entrypoint.dev.bash

CMD ["apps/views/scripts/entrypoint.dev.bash"]

FROM base AS production-dependencies

RUN yarn install --frozen-lockfile --production=true

FROM base AS production

WORKDIR /@streamforge

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /@streamforge

COPY --from=base /@streamforge/package.json /@streamforge/yarn.lock ./
COPY --from=production-dependencies /@streamforge/node_modules ./node_modules
COPY --from=builder /@streamforge/apps/views/prisma ./prisma
COPY --from=builder /@streamforge/apps/views/generated/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node /.prisma/client/libquery_engine-linux-musl-openssl-3.0.x.so.node
COPY --from=builder /@streamforge/dist/apps/views/main.js ./src/main.js
COPY --from=builder /@streamforge/dist/apps/views/proto ./proto
COPY --from=builder /@streamforge/dist/apps/views/scripts ./src/scripts

USER root

RUN chown -R node:node /@streamforge/node_modules/prisma
RUN chown -R node:node /@streamforge/prisma

USER node

CMD ["node", "src/main"]