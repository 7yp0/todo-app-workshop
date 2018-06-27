FROM node:latest

WORKDIR /var/www

COPY . .

RUN yarn install --production

EXPOSE 8000

CMD yarn start
