FROM node:24-alpine AS base

# pnpm comes from corepack, at the version pinned in package.json
# ("packageManager"), so the image installs from pnpm-lock.yaml.
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable pnpm
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

FROM base
COPY --from=deps /app/node_modules /app/node_modules
COPY . /app
EXPOSE 3333
CMD [ "node", "." ]
