FROM node:22-alpine

WORKDIR /app

ENV CI=true

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm -r build

EXPOSE 3001

CMD ["node", "apps/api/dist/main.js"]