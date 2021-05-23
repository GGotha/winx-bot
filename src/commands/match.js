const Discord = require("discord.js");
const api = require("../api/axios");
const path = require("path");
const RiotGames = require("../classes/RiotGames");
const Spectate = require("../classes/Spectate");
const Ranked = require("../classes/Ranked");

const DISCORD_COMMAND = "lol_match";

const NORMAL_GAME = 400;
const RANKED_GAME = 420;

module.exports.run = async (client, message, args) => {
  const userMessage = message.content.split(DISCORD_COMMAND)[1];

  const loadingMessage = await message.channel.send("Procurando partida...");

  try {
    const {
      id: summonerId,
      name: summonerName,
      summonerLevel,
      profileIconId: summonerIcon,
    } = await RiotGames.getSummonerTokensBySummonerName(userMessage);

    const embedSummonerIcon = `http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${summonerIcon}.png`;

    const spectate = await RiotGames.getInfoSpectate(summonerId);

    const blueSideSummoners = await Spectate.blueSidePlayers(
      spectate.participants
    );

    const redSideSummoners = await Spectate.redSidePlayers(
      spectate.participants
    );

    /**
     * TODO
     *
     * Remover getBlueSideSoloDuoPlayers e getRedSideSoloDuoPlayers
     *
     * Criar uma função getInfoSummonersSoloduo
     *
     * Essa função retornará os players blueSide e redSide
     * Ex response:
     *
     * {
     *  "blueSide": {
     *    player1: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *    player2: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *    player3: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *    player4: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *    player5: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *  },
     *  "redSide": {
     *    player1: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *    player2: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *    player3: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *    player4: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *    player5: { summonerName: 'Loveell', elo: 'BRONZE I 3PDL' }
     *  }
     * }
     *
     */

    const blueSidePlayers = await Ranked.getBlueSideSoloDuoPlayers(
      blueSideSummoners
    );

    const redSidePlayers = await Ranked.getRedSideSoloDuoPlayers(
      redSideSummoners
    );

    let botembed = new Discord.MessageEmbed()
      .setColor("#FF00FF")
      .setAuthor(summonerName)
      .setDescription(
        `

        `
      )
      .addFields(
        {
          name: "Blue side",
          value: `
          ${blueSidePlayers[`player1`].summonerName} - ${
            blueSidePlayers[`player1`].elo
          }
          ${blueSidePlayers[`player2`].summonerName} - ${
            blueSidePlayers[`player2`].elo
          }
          ${blueSidePlayers[`player3`].summonerName} - ${
            blueSidePlayers[`player3`].elo
          }
          ${blueSidePlayers[`player4`].summonerName} - ${
            blueSidePlayers[`player4`].elo
          }
          ${blueSidePlayers[`player5`].summonerName} - ${
            blueSidePlayers[`player5`].elo
          }
          `,
          // value: `${blueSideSummoners[0].summonerName} \n ${blueSideSummoners[1].summonerName} \n ${blueSideSummoners[2].summonerName} \n ${blueSideSummoners[3].summonerName} \n ${blueSideSummoners[4].summonerName}`,
          inline: true,
        },
        {
          name: "\u200b",
          value: "\u200b",
          inline: false,
        },
        {
          name: "Red Side",
          value: `
          ${redSidePlayers[`player1`].summonerName} - ${
            redSidePlayers[`player1`].elo
          }
          ${redSidePlayers[`player2`].summonerName} - ${
            redSidePlayers[`player2`].elo
          }
          ${redSidePlayers[`player3`].summonerName} - ${
            redSidePlayers[`player3`].elo
          }
          ${redSidePlayers[`player4`].summonerName} - ${
            redSidePlayers[`player4`].elo
          }
          ${redSidePlayers[`player5`].summonerName} - ${
            redSidePlayers[`player5`].elo
          }
          `,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter(
        "Since 2014",
        "https://upload.wikimedia.org/wikipedia/pt/4/4f/Winx_Club_Logo.png"
      );

    loadingMessage.delete();
    return message.channel.send(botembed);
  } catch (err) {
    console.log(err);
    loadingMessage.edit(`Partida não encontrada`);
  }
};
module.exports.help = {
  name: DISCORD_COMMAND,
};
