# Install deps only when needed
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci || npm install

# Copy source
COPY . .

# Build next for production (still can run dev in compose)
RUN npm run build || true

EXPOSE 3000
CMD ["npm", "run", "start"]
