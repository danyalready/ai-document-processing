# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL

ENV CI=true
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN corepack enable && corepack prepare pnpm@11.0.8 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile --filter web...

COPY apps/web ./apps/web

RUN --mount=type=cache,id=next-web,target=/app/apps/web/.next/cache \
    pnpm --filter web build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

WORKDIR /app/apps/web

CMD ["node", "server.js"]
