FROM node:16.17.0-alpine

WORKDIR /air-quality-test

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 5000

CMD ["yarn", "dev"]

