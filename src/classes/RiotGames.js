const axios = require("axios");

class RiotGames {
  constructor() {
    this.apiRiotGames = axios.create({
      headers: {
        common: {
          "X-Riot-Token": process.env.RIOT_GAMES_API_TOKEN,
        },
      },
      baseURL: process.env.RIOT_GAMES_API_URL,
    });
  }

  async getSummonerTokensBySummonerName(summonerName) {
    const response = await this.apiRiotGames.get(
      `/lol/summoner/v4/summoners/by-name/${summonerName}`
    );

    return response.data;
  }

  async getInfoSpectate(summonerId) {
    const response = await this.apiRiotGames.get(
      `/lol/spectator/v4/active-games/by-summoner/${summonerId}`
    );

    return response.data;
  }

  async getSummonerInfoBySummonerId(summonerId) {
    const response = await this.apiRiotGames.get(
      `/lol/league/v4/entries/by-summoner/${summonerId}`
    );

    return response.data;
  }
}

module.exports = new RiotGames();
