FROM oven/bun:alpine AS base

COPY . /app
WORKDIR /app

FROM base AS deps
RUN bun install --production --ignore-scripts

FROM base
COPY --from=deps /app/node_modules /app/node_modules
EXPOSE 3333
CMD [ "bun", "dev" ]