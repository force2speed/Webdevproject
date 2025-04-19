FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for Cloud Run)
RUN npm install --include=dev

# Copy all other files
COPY . .

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose the correct port
EXPOSE 8080

# Start command
CMD ["npm", "start"]