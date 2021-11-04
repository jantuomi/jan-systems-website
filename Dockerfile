FROM node:15-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci --only-prod

COPY . .
RUN npm run export
RUN rm -r .next/cache

FROM halverneus/static-file-server AS server

COPY --from=builder /app/out /web

# FROM node:15-alpine as runner

# WORKDIR /app
# ENV NODE_ENV production

# # COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# RUN chown -R nextjs:nodejs /app/.next
# USER nextjs

# EXPOSE 3000

# RUN npx next telemetry disable

# CMD ["npm", "run", "start"]
