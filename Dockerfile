### STAGE 1: Build ###
FROM node:12.7-alpine AS node
WORKDIR /app
COPY package.json ./
RUN npm install npm@latest -g
COPY ./ /app/
ARG env=prod
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
