# Uses node version 24 as the base image
FROM node:24

# Goes to the app directory (thikn of it like a cd terminal command)
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of our app into the container
COPY . .

# Set port environment variable (optional, for clarity)
ENV PORT=3000

# Expose the port so our computer can use it
EXPOSE 3000

# Run development server
CMD ["npx", "nodemon", "server.js"]