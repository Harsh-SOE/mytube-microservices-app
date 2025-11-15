FROM node:24-alpine AS base

WORKDIR /home/node

RUN apk add --no-cache curl
RUN curl -fL https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.21/grpc_health_probe-linux-amd64 -o /usr/local/bin/grpc_health_probe
RUN chmod +x /usr/local/bin/grpc_health_probe
RUN apk del curl

COPY package.json yarn.lock ./

FROM base AS build-dependencies

RUN yarn install --frozen-lockfile --production=false

FROM base AS builder

COPY --from=build-dependencies /home/node/node_modules ./node_modules

COPY apps/videos ./apps/videos
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx prisma generate --schema ./apps/videos/prisma/schema.prisma

RUN npx nest build videos

FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /home/node/node_modules ./node_modules

CMD ["yarn", "start:dev", "videos"]

FROM base AS production-dependencies

RUN yarn install --frozen-lockfile --production=true

FROM base AS production

WORKDIR /home/node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=base /home/node/package.json /home/node/yarn.lock ./
COPY --from=production-dependencies /home/node/node_modules ./node_modules
COPY --from=builder /home/node/apps/videos/prisma ./apps/videos/prisma
COPY --from=builder /home/node/apps/videos/generated ./apps/videos/generated
COPY --from=builder /home/node/dist/apps/videos ./apps/videos

USER root

RUN chown -R node:node /home/node/node_modules/prisma
RUN chown -R node:node /home/node/apps/videos/prisma
RUN chown -R node:node /home/node/apps/videos/generated/prisma

USER node

CMD ["node", "./apps/videos/src/main.js"]