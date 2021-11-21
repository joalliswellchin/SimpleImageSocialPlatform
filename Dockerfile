FROM node:10.19.0-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3001

CMD npm run start
