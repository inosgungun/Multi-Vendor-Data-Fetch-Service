FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 

WORKDIR /app/api
CMD ["npm", "run", "start:api"]
