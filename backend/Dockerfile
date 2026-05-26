FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --clean

COPY . .
RUN npm run build

# Production image - only runtime deps
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm upgrade

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/db ./db

EXPOSE 3001

CMD ["node", "dist/index.js"]
