# build environment
FROM node:18.13.0-alpine as dependencies
WORKDIR /app
ARG NPM_TOKEN
COPY package*.json decorate-angular-cli.js .npmrc ./
RUN npm ci
RUN rm -f .npmrc

FROM dependencies as build
ARG TARGET=prod
COPY . ./

RUN npm run build:admin:${TARGET}

FROM nginx:1.23-alpine
COPY --from=build /app/dist/apps/admin /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
