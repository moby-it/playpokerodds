FROM node:lts-slim as dependencies
WORKDIR /src
COPY package*.json /
RUN npm ci

FROM dependencies as build
WORKDIR /src
COPY . ./
RUN npm run build

FROM build
EXPOSE 7071
CMD ["npm","run","start"]
