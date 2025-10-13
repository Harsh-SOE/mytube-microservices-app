FROM node:24-alpine AS base

WORKDIR /home/node

RUN apk add --no-cache curl

COPY package.json yarn.lock ./

FROM base AS build-dependencies

RUN yarn install --frozen-lockfile --production=false

FROM base AS builder

COPY --from=build-dependencies /home/node/node_modules ./node_modules

COPY apps/likes-aggregator ./apps/likes-aggregator
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx prisma generate --schema ./apps/likes-aggregator/prisma/schema.prisma

RUN npx nest build likes-aggregator

FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /home/node/node_modules ./node_modules

CMD ["yarn", "start:dev", "likes-aggregator"]

FROM base AS production-dependencies

RUN yarn install --frozen-lockfile --production=true

FROM base AS production

WORKDIR /home/node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=base /home/node/package.json /home/node/yarn.lock ./
COPY --from=production-dependencies /home/node/node_modules ./node_modules
COPY --from=builder /home/node/apps/likes-aggregator/prisma/schema.prisma ./apps/likes-aggregator/prisma/schema.prisma
COPY --from=builder /home/node/apps/likes-aggregator/generated/prisma ./apps/likes-aggregator/generated/prisma
COPY --from=builder /home/node/dist/apps/likes-aggregator ./apps/likes-aggregator

USER root

RUN chown -R node:node /home/node/node_modules/prisma
RUN chown -R node:node /home/node/apps/likes-aggregator/generated/prisma
RUN chown -R node:node /home/node/apps/likes-aggregator/prisma

USER node

CMD ["node", "apps/likes-aggregator/src/main.js"]