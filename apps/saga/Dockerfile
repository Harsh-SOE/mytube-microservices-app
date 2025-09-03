FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN apk add --no-cache curl tar && \
    GRPCURL_VERSION=1.9.1 && \
    curl -L https://github.com/fullstorydev/grpcurl/releases/download/v${GRPCURL_VERSION}/grpcurl_${GRPCURL_VERSION}_linux_x86_64.tar.gz -o /tmp/grpcurl.tar.gz && \
    tar -xzf /tmp/grpcurl.tar.gz -C /tmp && \
    mv /tmp/grpcurl /usr/local/bin/grpcurl && \
    curl -fL https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.21/grpc_health_probe-linux-amd64 -o /usr/local/bin/grpc_health_probe && \
    chmod +x /usr/local/bin/grpc_health_probe && \
    apk del curl tar
    
RUN yarn build saga

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV={NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.json ./
RUN yarn install --production

COPY --from=development usr/src/app/dist/apps/saga ./dist
COPY --from=development /usr/local/bin/grpc_health_probe /usr/local/bin/grpc_health_probe

CMD [ "node", "dist/main" ]