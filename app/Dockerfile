FROM node:19.3.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
RUN pnpm build

FROM base
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/.output
EXPOSE 3000
CMD [  "node", ".output/server/index.mjs", "NODE_TLS_REJECT_UNAUTHORIZED='0'" ]