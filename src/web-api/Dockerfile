FROM node:18.13.0-alpine as dependencies
WORKDIR /src
COPY package*.json /
RUN npm ci

FROM dependencies as build
RUN apk --no-cache add curl
WORKDIR /src
COPY . ./
RUN npx prisma generate
RUN npm run build


FROM build

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health/liveness || exit 1

CMD ["npm","run","start"]
