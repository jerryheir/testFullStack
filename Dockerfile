FROM node:10

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./

COPY /src ./src

COPY /config ./config

RUN yarn install

RUN yarn build

COPY . .

COPY config/config.env ./dist/

EXPOSE 5000

CMD ["yarn", "start"]