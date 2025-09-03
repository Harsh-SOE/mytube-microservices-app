# ---- Stage 1: Common Base with Node + NVIDIA ----
# This stage has the common dependencies: an NVIDIA base image + Node.js.
# Both our development and production stages will build from this.
FROM jrottenberg/ffmpeg:7.1-nvidia2204 AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    procps \
    ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && rm -rf /var/lib/apt/lists/*
    
WORKDIR /usr/src/app


# ---- Stage 2: GPU-Enabled Development Environment ----
# This is your new dev container stage.
# It uses the NVIDIA base and installs ALL dependencies for hot-reloading.
FROM base AS development

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build video-transcoder


# ---- Stage 3: Production Build Stage ----
# This temporary stage compiles your code. It doesn't need NVIDIA drivers.
FROM node:22-slim AS build

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build video-transcoder


# ---- Stage 4: Final Production Image ----
# This stage uses the NVIDIA base, installs ONLY production dependencies,
# and copies the compiled code from the 'build' stage.
FROM base AS production

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=build /usr/src/app/dist/apps/video-transcoder ./dist

CMD ["node", "dist/main"]