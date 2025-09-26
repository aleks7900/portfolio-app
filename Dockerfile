# ====== 1) BUILD: Vite ======
FROM node:20-alpine AS build
WORKDIR /app

ENV CI=true
ARG VITE_API_BASE=/api
ENV VITE_API_BASE=${VITE_API_BASE}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build   # => dist/

# ====== 2) RUNTIME: nginx (только SPA) ======
FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

# Пишем конфиг inline — SPA fallback + долгий кэш ассетов
RUN rm -f /etc/nginx/conf.d/default.conf && \
    printf '%s\n' \
'server {' \
'  listen 80;' \
'  server_name _;' \
'  root /usr/share/nginx/html;' \
'  index index.html;' \
'' \
'  # SPA: всё, что не файл, уходит в index.html' \
'  location / {' \
'    try_files $uri /index.html;' \
'  }' \
'' \
'  # Долгий кэш для ассетов с хешами' \
'  location ~* \.(?:js|css|png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?)$ {' \
'    expires 30d;' \
'    add_header Cache-Control "public, max-age=2592000, immutable";' \
'    try_files $uri =404;' \
'  }' \
'}' \
> /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=5 CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
CMD ["nginx","-g","daemon off;"]
