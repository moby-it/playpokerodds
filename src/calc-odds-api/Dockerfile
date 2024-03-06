FROM denoland/deno:1.41.0

ENV PORT=7071
EXPOSE $PORT
WORKDIR /app
COPY . .
RUN deno cache main.ts

CMD exec deno run --allow-net --allow-env main.ts