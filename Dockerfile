FROM node:20 as builder
WORKDIR /app

RUN corepack enable pnpm

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package.json ./
RUN pnpm install --offline

COPY . .
RUN pnpm run db:generate
RUN pnpm build

RUN pnpm prune --prod

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY prisma ./prisma
COPY styles ./styles
COPY next.config.mjs ./
COPY .env.production .env

EXPOSE 3000