# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app

# Install all the dependencies
RUN yarn install

# Generate the build of the application
RUN yarn build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/hackthon-frontend /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80