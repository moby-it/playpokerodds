FROM node:18.13.0-alpine as dependencies
WORKDIR /src
ARG NPM_TOKEN
COPY package*.json .npmrc ./
RUN npm ci
RUN rm -f .npmrc


FROM dependencies as build
WORKDIR /src
COPY . ./
RUN npm run build


FROM node:18.13.0-alpine
RUN apk --no-cache add curl
EXPOSE 7071
WORKDIR /src
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:7071/liveness || exit 1

COPY --from=dependencies /src/node_modules ./node_modules
COPY --from=build /src/dist ./
COPY ./package*.json ./

CMD ["node","index.js"]
