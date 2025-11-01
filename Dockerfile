# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create directories for auth data
RUN mkdir -p auth_info_baileys

# Expose port (if needed for health checks)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]