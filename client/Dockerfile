# Stage 1: Build React static assets with Node.js
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve React frontend static files using Nginx
FROM nginx:alpine

# Copy custom Nginx SPA routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built dist files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

