FROM node:18.14.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]
