FROM node:14-alpine as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

RUN npm run build


FROM nginx:1.17.1-alpine

COPY --from=build-step /app/build /usr/share/nginx/html



