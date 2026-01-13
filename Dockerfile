# Build Stage
FROM node:23-alpine as build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the application
COPY . .
# Disable analytics to prevent hanging
ENV NG_CLI_ANALYTICS=ci
RUN npm run build

# Serve Stage
FROM nginx:alpine
# Copy built assets from 'dist' (based on angular.json outputPath.base)
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config if needed, otherwise default is used
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
