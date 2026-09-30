FROM oven/bun:alpine AS base

ENV SERVER_URL=http://localhost:3333

COPY . /app
WORKDIR /app

FROM base AS deps
RUN bun install --production --ignore-scripts

FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
RUN bun run build

FROM base
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/.output

EXPOSE 3000

CMD [  "bun", ".output/server/index.mjs" ]