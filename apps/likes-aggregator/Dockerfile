FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
  
RUN yarn build likes-aggregator

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=development /usr/src/app/dist/apps/likes-aggregator ./dist

CMD [ "node", "dist/main" ]