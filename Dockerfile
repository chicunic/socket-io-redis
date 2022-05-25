FROM node:16-buster-slim

WORKDIR /app

COPY . /app/
RUN yarn

EXPOSE 8080

CMD ["yarn", "start"]
