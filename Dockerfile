FROM node:16.15.0

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
COPY yarn.lock /code/yarn.lock
COPY craco.config.js /code/craco.config.js

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]
