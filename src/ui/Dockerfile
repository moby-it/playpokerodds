# build environment
FROM node:lts-alpine as dependencies
WORKDIR /app
COPY . ./
RUN npm ci

FROM dependencies as build
WORKDIR /app
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist/apps/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
