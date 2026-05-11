FROM node:22-alpine

WORKDIR /app

ENV CI=true

COPY . .

RUN npm install -g pnpm

RUN pnpm install

CMD ["pnpm", "--filter", "worker", "dev"]