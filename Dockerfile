# Intermediate docker image to build the bundle in and install dependencies
FROM node:19.2-alpine3.15 as build

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json over in the intermedate "build" image
COPY package*.json ./

# Install the dependencies
# Clean install because we want to install the exact versions
RUN npm ci

# Copy the source code into the build image
COPY ./ ./

# Build the project
RUN npm run build

# Pull the same Node image and use it as the final (production image)
FROM node:19.2-alpine3.15 as production

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Only copy the results from the build over to the final image
# We do this to keep the final image as small as possible
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/server ./server
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/adapters ./adapters
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/package*.json ./

# Expose port 3000 (default port)
EXPOSE 3000

# Start the application
CMD [ "node", "server/entry.express"]