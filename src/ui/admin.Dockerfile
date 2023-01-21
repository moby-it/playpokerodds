# build environment
FROM node:18.13.0-alpine as dependencies
WORKDIR /app
COPY package*.json decorate-angular-cli.js ./
RUN npm ci

FROM dependencies as build
ARG TARGET=prod
COPY . ./

RUN npm run build:admin:${TARGET}

FROM nginx:stable-alpine
COPY --from=build /app/dist/apps/admin /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
