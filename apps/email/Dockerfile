FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN apk add --no-cache curl && \
    curl -fL https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.21/grpc_health_probe-linux-amd64 -o /usr/local/bin/grpc_health_probe && \
    chmod +x /usr/local/bin/grpc_health_probe && \
    apk del curl
    
RUN yarn build email

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY --from=development /usr/src/app/dist/apps/email ./dist
COPY --from=development /usr/local/bin/grpc_health_probe /usr/local/bin/grpc_health_probe

RUN ["node", "dist/main"]