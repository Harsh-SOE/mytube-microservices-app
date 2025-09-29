FROM node:24-alpine AS base

WORKDIR /usr/src/app

RUN apk add --no-cache curl && \
    curl -fL https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.21/grpc_health_probe-linux-amd64 -o /usr/local/bin/grpc_health_probe && \
    chmod +x /usr/local/bin/grpc_health_probe && \
    apk del curl

COPY package.json yarn.lock ./

FROM base AS build-dependencies

RUN yarn install --frozen-lockfile --production=false

FROM base AS builder

COPY --from=build-dependencies /usr/src/app/node_modules ./node_modules

COPY apps/videos ./apps/videos
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx prisma generate --schema ./apps/videos/prisma/schema.prisma

RUN npx nest build videos

FROM base AS development

ENV NODE_ENV=development

COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start:dev", "videos"]

FROM base AS production-dependencies

RUN yarn install --frozen-lockfile --production=true

FROM base AS production

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY --from=production-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist/apps/videos ./apps/videos

COPY --from=builder /usr/src/app/apps/videos/generated/prisma ./apps/videos/generated/prisma
COPY --from=builder /usr/src/app/apps/videos/prisma/schema.prisma ./apps/videos/prisma/schema.prisma

COPY --from=base /usr/src/app/package.json /usr/src/app/yarn.lock ./

USER root
RUN chown -R node:node /home/node/app/apps/videos/prisma
RUN chown -R node:node /home/node/app/apps/videos/generated
RUN chown -R node:node /home/node/app/node_modules/prisma
USER node

CMD ["node", "apps/videos/src/main.js"]