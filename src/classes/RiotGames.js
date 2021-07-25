const axios = require("axios");

class RiotGames {
  constructor() {
    this.apiRiotGames = axios.create({
      headers: {
        common: {
          "X-Riot-Token": "RGAPI-0cc17cc0-06d6-4a76-be66-c002177c5283",
        },
      },
      baseURL: "https://br1.api.riotgames.com/",
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
