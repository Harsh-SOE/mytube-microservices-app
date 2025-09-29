FROM node:24-alpine AS base

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

FROM base AS build-dependencies

RUN yarn install --frozen-lockfile --production=false

FROM base AS builder

COPY --from=build-dependencies /usr/src/app/node_modules ./node_modules

COPY apps/api-gateway ./apps/api-gateway
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx nest build api-gateway

FROM base AS development

ENV NODE_ENV=development

COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start:dev", "api-gateway"]

FROM base AS production-dependencies

RUN yarn install --frozen-lockfile --production=true

FROM base AS production

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY --from=production-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist/apps/api-gateway ./apps/api-gateway

COPY --from=base /usr/src/app/package.json /usr/src/app/yarn.lock ./

USER node

CMD ["node", "apps/api-gateway/src/main.js"]
