FROM node:15-alpine
RUN apk add g++ make python
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN yarn 
COPY . /usr/src/app
EXPOSE 8000
CMD [ "npm", "start" ]