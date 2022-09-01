FROM node:18.8.0

WORKDIR /usr/source
COPY . .

RUN yarn install
RUN yarn build

CMD ["node", "./dist/src/main.js"]