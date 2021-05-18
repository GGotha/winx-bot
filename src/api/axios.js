const axios = require("axios");

const riotGamesBaseURL = "https://br1.api.riotgames.com/";

const api = axios.create({
  headers: {
    common: {
      "X-Riot-Token": "RGAPI-8947911b-dc82-4b48-a1b8-065d4f0aa916",
    },
  },
  baseURL: riotGamesBaseURL,
});

module.exports = api;
