FROM node:24-alpine AS base

WORKDIR /home/node

RUN apk add --no-cache curl

COPY package.json yarn.lock ./

FROM base AS build-dependencies

RUN yarn install --frozen-lockfile --production=false

FROM base AS builder

COPY --from=build-dependencies /home/node/node_modules ./node_modules

COPY apps/comments-aggregator ./apps/comments-aggregator
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx prisma generate --schema ./apps/comments-aggregator/prisma/schema.prisma

RUN npx nest build comments-aggregator

FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /home/node/node_modules ./node_modules

CMD ["yarn", "start:dev", "comments-aggregator"]

FROM base AS production-dependencies

RUN yarn install --frozen-lockfile --production=true

FROM base AS production

WORKDIR /home/node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=base /home/node/package.json /home/node/yarn.lock ./
COPY --from=production-dependencies /home/node/node_modules ./node_modules
COPY --from=builder /home/node/apps/comments-aggregator/prisma/schema.prisma ./apps/comments-aggregator/prisma/schema.prisma
COPY --from=builder /home/node/apps/comments-aggregator/generated/prisma ./apps/comments-aggregator/generated/prisma
COPY --from=builder /home/node/dist/apps/comments-aggregator ./apps/comments-aggregator

USER root

RUN chown -R node:node /home/node/node_modules/prisma
RUN chown -R node:node /home/node/apps/comments-aggregator/prisma
RUN chown -R node:node /home/node/apps/comments-aggregator/generated/prisma

USER node

CMD ["node", "apps/comments-aggregator/src/main.js"]