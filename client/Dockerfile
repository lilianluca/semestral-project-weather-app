# Change in production
# FROM node:18-alpine
FROM node:18

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

# Change in production
# RUN npm run build

EXPOSE 8080

# Change in production
# CMD [ "npm", "run", "preview" ]
CMD [ "npm", "run", "dev-exposed" ]