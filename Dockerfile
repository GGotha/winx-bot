FROM node:14-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Bundle app source
COPY . .

EXPOSE 3333
ENV TOKEN $TOKEN
ENV PREFIX $PREFIX
ENV RIOT_GAMES_API_URL $RIOT_GAMES_API_URL
ENV RIOT_GAMES_API_TOKEN $RIOT_GAMES_API_TOKEN
CMD [ "node", "src/index.js" ]