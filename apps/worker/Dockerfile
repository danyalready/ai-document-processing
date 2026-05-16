FROM node:22-alpine

WORKDIR /app

ENV CI=true

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm -r build

CMD ["node", "apps/worker/dist/index.js"]