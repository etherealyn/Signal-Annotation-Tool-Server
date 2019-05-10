FROM node:10.15.3 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:10.15.3-alpine
WORKDIR /app

COPY --from=builder /usr/src/app/node_modules /app/node_modules
COPY --from=builder /usr/src/app/dist /app/dist

EXPOSE 3000

CMD node dist/src/main.js
