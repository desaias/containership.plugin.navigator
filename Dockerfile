FROM containership/alpine-node-yarn

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN yarn install
COPY . /app
RUN yarn build

CMD ["node", "server-prod"]
