FROM node:22-alpine

WORKDIR /app

ENV CI=true

COPY . .

RUN npm install -g pnpm

RUN pnpm install

EXPOSE 3001

CMD ["pnpm", "--filter", "api", "start:dev"]