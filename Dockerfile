FROM jrottenberg/ffmpeg:4.1-alpine AS ffmpeg
FROM node:16.16.0-alpine3.15

COPY --from=ffmpeg / /

WORKDIR /usr/source

COPY . .

RUN yarn install

RUN yarn build

CMD ["node", "./dist/src/main.js"]