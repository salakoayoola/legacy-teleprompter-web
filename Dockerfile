# Stage 1: Builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:22-alpine AS runner
WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Create data directory and set permissions for non-root node user
RUN mkdir -p /app/data && chown -R node:node /app/data

# Copy dependencies and source files
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY server.js ./
COPY web/ ./web/

# Run as non-root user
USER node

# Healthcheck definition
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "server.js"]