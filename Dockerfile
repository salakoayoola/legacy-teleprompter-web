FROM node:18-alpine
WORKDIR /app
# Create data directory for SQLite
RUN mkdir -p /app/data
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]