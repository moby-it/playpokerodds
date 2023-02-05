FROM node:18.13.0-alpine as dependencies
WORKDIR /src
ARG NPM_TOKEN
COPY package*.json .npmrc /
RUN npm ci
RUN rm -f .npmrc
FROM dependencies as build
RUN apk --no-cache add curl
WORKDIR /src
COPY . ./
RUN npm run build


FROM build

EXPOSE 7071

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:7071/liveness || exit 1

CMD ["npm","run","start"]
