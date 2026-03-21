# ─── Development stage ────────────────────────────────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

# Copy package files first for layer caching
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start dev server, binding to 0.0.0.0 so it's reachable from host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# ─── Build stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build


# ─── Production stage (nginx) ─────────────────────────────────────────────────
FROM nginx:alpine AS prod

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# SPA routing: all paths fall back to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
