FROM node:24-alpine AS base

WORKDIR /usr/src/app

RUN apk add --no-cache curl

COPY package.json yarn.lock ./

FROM base AS build-dependencies

RUN yarn install --frozen-lockfile --production=false

FROM base AS builder

COPY --from=build-dependencies /usr/src/app/node_modules ./node_modules

COPY apps/comments-aggregator ./apps/comments-aggregator
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx prisma generate --schema ./apps/comments-aggregator/prisma/schema.prisma

RUN npx nest build comments-aggregator

FROM base AS development

ENV NODE_ENV=development

COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start:dev", "comments-aggregator"]

FROM base AS production-dependencies

RUN yarn install --frozen-lockfile --production=true

FROM base AS production

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY --from=production-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist/apps/comments-aggregator ./apps/comments-aggregator

COPY --from=builder /usr/src/app/apps/comments-aggregator/generated/prisma ./apps/comments-aggregator/generated/prisma
COPY --from=builder /usr/src/app/apps/comments-aggregator/prisma/schema.prisma ./apps/comments-aggregator/prisma/schema.prisma

COPY --from=base /usr/src/app/package.json /usr/src/app/yarn.lock ./

USER root
RUN chown -R node:node /home/node/app/apps/comments-aggregator/prisma
RUN chown -R node:node /home/node/app/apps/comments-aggregator/generated
RUN chown -R node:node /home/node/app/node_modules/prisma
USER node

CMD ["node", "apps/comments-aggregator/src/main.js"]