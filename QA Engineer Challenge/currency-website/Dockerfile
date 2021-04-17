# Build stage
FROM node:13.7.0-alpine as build-stage

WORKDIR /build

ADD package*.json ./

RUN npm install

ADD . .

RUN npm run build

# Production stage
FROM nginx:alpine

WORKDIR /build

COPY --from=build-stage /build/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]