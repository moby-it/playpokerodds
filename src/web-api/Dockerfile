FROM node:18.13.0-alpine as dependencies
WORKDIR /src
ARG NPM_TOKEN
COPY package*.json .npmrc ./
RUN npm ci
RUN rm -f .npmrc


FROM dependencies as build
WORKDIR /src
COPY . ./
RUN npx prisma generate
RUN npm run build


FROM node:18.13.0-alpine
EXPOSE 3000
WORKDIR /src
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health/liveness || exit 1

COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/prisma ./prisma
COPY --from=build /src/dist ./
COPY ./package*.json ./

CMD ["node","app.js"]
