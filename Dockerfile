FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build-ts

EXPOSE 8080

CMD [ "npm", "start" ]
