# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY package*.json ./

# Install dependencies and build
RUN npm install

COPY . .

RUN npm run build

# Expose port
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
