FROM node:24-alpine AS base

WORKDIR /usr/src/app

RUN apk add --no-cache curl && \
    curl -fL https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.21/grpc_health_probe-linux-amd64 -o /usr/local/bin/grpc_health_probe && \
    chmod +x /usr/local/bin/grpc_health_probe && \
    apk del curl

COPY package.json yarn.lock ./

FROM base AS build-dependencies

RUN yarn install --frozen-lockfile --production=false

FROM base AS production-dependencies

RUN yarn install --frozen-lockfile --production=true

FROM base AS builder

COPY --from=build-dependencies /usr/src/app/node_modules ./node_modules

COPY apps/likes-aggregator ./apps/likes-aggregator
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx prisma generate --schema ./apps/likes-aggregator/prisma/schema.prisma

RUN npx nest build likes-aggregator

FROM base AS development

ENV NODE_ENV=development

COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start:dev", "likes-aggregator"]

FROM base AS production

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY --from=production-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist/apps/likes-aggregator ./apps/likes-aggregator

COPY --from=builder /usr/src/app/apps/likes-aggregator/generated/prisma ./apps/likes-aggregator/generated/prisma
COPY --from=builder /usr/src/app/apps/likes-aggregator/prisma/schema.prisma ./apps/likes-aggregator/prisma/schema.prisma

COPY --from=base /usr/src/app/package.json /usr/src/app/yarn.lock ./

USER node

CMD ["node", "apps/likes-aggregator/src/main.js"]