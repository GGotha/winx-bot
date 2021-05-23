const api = require("../api/axios");
const RiotGames = require("../classes/RiotGames");

class Ranked {
  async getBlueSideSoloDuoPlayers(blueSideSummoners) {
    var blueSidePlayers = [];
    var countPlayer = 0;

    const blueSideSummonersInfo = await Promise.all(
      blueSideSummoners.map(async (summoners) => {
        countPlayer++;
        blueSidePlayers[`player${countPlayer}`] = {
          summonerName: summoners.summonerName,
          elo: "Unranked",
        };
        return await RiotGames.getSummonerInfoBySummonerId(
          summoners.summonerId
        );
      })
    );

    countPlayer = 0;

    blueSideSummonersInfo.forEach((summonersInfo) => {
      countPlayer++;
      const soloDuo = summonersInfo.filter((rank) => {
        return rank.queueType === "RANKED_SOLO_5x5";
      });

      soloDuo.forEach((player) => {
        const buildPlayerElo =
          player.tier + " " + player.rank + " " + player.leaguePoints + "PDL";

        blueSidePlayers[`player${countPlayer}`] = {
          ...blueSidePlayers[`player${countPlayer}`],
          elo: buildPlayerElo,
        };
      });
    });

    return blueSidePlayers;
  }

  async getRedSideSoloDuoPlayers(redSideSummoners) {
    var redSidePlayers = [];
    var countPlayer = 0;

    const redSideSummonersInfo = await Promise.all(
      redSideSummoners.map(async (summoners) => {
        countPlayer++;
        redSidePlayers[`player${countPlayer}`] = {
          summonerName: summoners.summonerName,
          elo: "Unranked",
        };
        return await RiotGames.getSummonerInfoBySummonerId(
          summoners.summonerId
        );
      })
    );

    countPlayer = 0;

    redSideSummonersInfo.forEach((summonersInfo) => {
      countPlayer++;
      const soloDuo = summonersInfo.filter((rank) => {
        return rank.queueType === "RANKED_SOLO_5x5";
      });

      soloDuo.forEach((player) => {
        const buildPlayerElo =
          player.tier + " " + player.rank + " " + player.leaguePoints + "PDL";
        redSidePlayers[`player${countPlayer}`] = {
          ...redSidePlayers[`player${countPlayer}`],
          elo: buildPlayerElo,
        };
      });
    });

    console.log(redSidePlayers);

    return redSidePlayers;
  }
}

module.exports = new Ranked();
