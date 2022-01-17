FROM node:16.13.2-alpine as production

WORKDIR /usr/src/app

COPY package.json .

RUN  npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]
