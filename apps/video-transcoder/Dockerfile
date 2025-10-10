FROM node:24-alpine AS base

WORKDIR /usr/src/app

RUN apk add --no-cache ffmpeg curl

COPY package.json yarn.lock ./

FROM base AS build-dependencies

RUN yarn install --frozen-lockfile --production=false

FROM base AS builder

COPY --from=build-dependencies /usr/src/app/node_modules ./node_modules

COPY apps/video-transcoder ./apps/video-transcoder
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx nest build video-transcoder

FROM base AS development

ENV NODE_ENV=development

COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start:dev", "video-transcoder"]

FROM base AS production-dependencies

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

FROM base AS production

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY --from=production-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist/apps/video-transcoder ./apps/video-transcoder

COPY --from=base /usr/src/app/package.json /usr/src/app/yarn.lock ./

USER root
RUN mkdir /home/node/transcoded-videos
RUN chown -R node:node /home/node/transcoded-videos
USER node

CMD ["node", "apps/video-transcoder/src/main.js"]