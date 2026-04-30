# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS build
WORKDIR /app
COPY admin-frontend/package.json admin-frontend/package-lock.json ./
RUN npm ci
COPY admin-frontend/ ./
ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:1.27-alpine AS runtime
RUN apk add --no-cache wget
COPY admin-frontend/nginx.admin.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=20s --timeout=3s CMD wget -qO- http://localhost/health || exit 1
