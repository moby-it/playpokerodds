# build environment
FROM node:lts-alpine as dependencies
WORKDIR /app
COPY . ./
RUN npm ci

FROM dependencies as build
WORKDIR /app
RUN npm run build:admin

FROM nginx:stable-alpine
COPY --from=build /app/dist/apps/admin /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]