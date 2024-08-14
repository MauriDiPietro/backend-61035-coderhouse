FROM node:20.16.0-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
COPY .env .env
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]