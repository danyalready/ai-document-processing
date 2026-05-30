# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base

WORKDIR /app

ENV CI=true

RUN corepack enable && corepack prepare pnpm@11.0.8 --activate

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/worker/package.json ./apps/worker/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile --filter worker...

FROM deps AS builder

COPY apps/worker ./apps/worker
COPY packages/shared ./packages/shared

RUN pnpm --filter @app/shared build && pnpm --filter worker build

FROM base AS runner

ENV NODE_ENV=production

COPY packages/shared/package.json ./packages/shared/package.json

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/worker/node_modules ./apps/worker/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules

COPY --from=builder /app/apps/worker/dist ./apps/worker/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

CMD ["node", "apps/worker/dist/index.js"]
