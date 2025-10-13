FROM node:24-alpine AS base

WORKDIR /home/node

RUN apk add --no-cache curl

COPY package.json yarn.lock ./

FROM base AS build-dependencies

# installs at /home/node/node_modules

RUN yarn install --frozen-lockfile --production=false

FROM base AS builder

# file structure of builder:
  # /home/node:
    # apps/api-gateway
    # node_modules
    # libs
    # nest-cli.json
    # tsconfig.json

COPY --from=build-dependencies /home/node/node_modules ./node_modules

COPY apps/api-gateway ./apps/api-gateway
COPY libs ./libs
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN npx nest build api-gateway

# dist generated at /home/node/dist and contains:
  # apps/api-gateway:
    # src/main.js
    # proto/*

FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /home/node/node_modules ./node_modules

CMD ["yarn", "start:dev", "api-gateway"]

FROM base AS production-dependencies

RUN yarn install --frozen-lockfile --production=true

FROM base AS production

WORKDIR /home/node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# file structure of production stage:
  # /home/node:
    # package.json
    # yarn.lock
    # node_modules
    # apps/api-gateway:
      # src/main.js
      # proto

COPY --from=base /home/node/package.json /home/node/yarn.lock ./
COPY --from=production-dependencies /home/node/node_modules ./node_modules
COPY --from=builder /home/node/dist/apps/api-gateway ./apps/api-gateway

USER node

CMD ["node", "apps/api-gateway/src/main.js"]
