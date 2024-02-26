FROM node:20.11.0-alpine as dependencies
WORKDIR /src
COPY package*.json ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci -f

FROM dependencies as build
WORKDIR /src
COPY . ./
RUN npm run build


FROM node:20.11.0-alpine

LABEL org.opencontainers.image.source=https://github.com/moby-it/playpokerodds

RUN apk --no-cache add curl
EXPOSE 7071
WORKDIR /src
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:7071/liveness || exit 1

COPY --from=dependencies /src/node_modules ./node_modules
COPY --from=build /src/dist ./
COPY ./package*.json ./

CMD ["node","index.js"]
