# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your app will run
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
