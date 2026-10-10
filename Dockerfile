FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
# \$host stays literal so nginx forwards the browser's host, as before.
ENV BACKEND_UPSTREAM=http://backend:4000 \
    BACKEND_HOST_HEADER=\$host \
    NGINX_ENVSUBST_FILTER=^BACKEND_
EXPOSE 80
CMD ["nginx","-g","daemon off;"]