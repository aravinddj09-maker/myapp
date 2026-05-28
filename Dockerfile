# =========================
# Stage 1 - Build Angular
# =========================
FROM node:22-alpine AS build

WORKDIR /app

# Increase memory for Angular build
ENV NODE_OPTIONS=--max-old-space-size=4096

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build Angular app
RUN npm run build --configuration=production

# =========================
# Stage 2 - Nginx Server
# =========================
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build files
COPY --from=build /app/dist/myapp/browser /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]