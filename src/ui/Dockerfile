# build environment
FROM node:20.11.0-alpine as dependencies
WORKDIR /app
RUN npm i -g pnpm@9.0.4
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc pnpm install --frozen-lockfile

FROM dependencies as build
ARG TARGET=prod
COPY . ./
RUN pnpm build:${TARGET}

FROM nginx:1.23-alpine

LABEL org.opencontainers.image.source=https://github.com/moby-it/playpokerodds


COPY --from=build /app/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
