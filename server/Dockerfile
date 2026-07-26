# Use lightweight official Node.js image
FROM node:20-alpine

WORKDIR /app

# Copy package files first for optimal layer caching
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy server code
COPY . .

EXPOSE 5001

ENV PORT=5001
ENV NODE_ENV=production

CMD ["node", "index.js"]
