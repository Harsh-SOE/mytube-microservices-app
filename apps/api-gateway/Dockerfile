# ---------- Build Stage ----------
FROM node:alpine AS development

WORKDIR /usr/src/app

# Copy only the files needed to install deps
COPY package.json yarn.lock ./
RUN yarn install

# Copy everything else (source code, config files)
COPY . .

# Build only the specific app
RUN yarn build api-gateway


# ---------- Production Stage ----------
FROM node:alpine AS production

# Set environment
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

# Install only production dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy only the built output from the previous stage
COPY --from=development /usr/src/app/dist/apps/api-gateway ./dist

# If you use shared libs, you may need to copy them too:
# COPY --from=development /usr/src/app/dist/libs ./dist/libs

# Launch the app
CMD ["node", "dist/main"]
