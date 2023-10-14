FROM node:19.3.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
COPY . /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
RUN pnpm build
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]