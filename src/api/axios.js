const axios = require("axios");

const riotGamesBaseURL = "https://br1.api.riotgames.com/";

const api = axios.create({
  headers: {
    common: {
      "X-Riot-Token": process.env.RIOT_GAMES_API_TOKEN,
    },
  },
  baseURL: riotGamesBaseURL,
});

module.exports = api;
