# Use an official lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend source code
COPY . .

# Build the frontend
RUN npm run build

# Install a static file server
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the frontend using serve
CMD ["serve", "-s", "dist"]
