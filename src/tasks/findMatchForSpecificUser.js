const Discord = require("discord.js");
const RiotGames = require("../classes/RiotGames");
const Spectate = require("../classes/Spectate");
const Ranked = require("../classes/Ranked");
const { LolWhitelistFindMatches, LolMatches } = require("../sequelize/models");

const CHANNEL_ID_WHICH_MESSAGE_WILL_BE_SENT = process.env.MATCHES_CHANNEL_ID;

module.exports = async (client) => {
  const names = await LolWhitelistFindMatches.findAll();

  const listNamesFormatted = names.map((name) => {
    return name.lol_name;
  });

  console.log(`Searching for ${listNamesFormatted}`);

  names.map(async (name) => {
    const encodedLolNickname = encodeURIComponent(name.lol_name);

    try {
      const {
        id: summonerId,
        name: summonerName,
        summonerLevel,
        profileIconId: summonerIcon,
      } = await RiotGames.getSummonerTokensBySummonerName(encodedLolNickname);

      const spectate = await RiotGames.getInfoSpectate(summonerId);

      const [match, created] = await LolMatches.findOrCreate({
        where: { lol_match_id: spectate.gameId },
        defaults: {
          created_at: new Date(),
        },
      });

      if (!created) {
        return;
      }

      const blueSideSummoners = await Spectate.blueSidePlayers(
        spectate.participants
      );
      const redSideSummoners = await Spectate.redSidePlayers(
        spectate.participants
      );
      const blueSideSummonersSoloduo = await Ranked.getBlueSideSoloDuoPlayers(
        blueSideSummoners
      );
      const redSideSummonersSoloduo = await Ranked.getRedSideSoloDuoPlayers(
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
            ${blueSideSummonersSoloduo[`player1`].summonerName} - ${
              blueSideSummonersSoloduo[`player1`].elo
            }
            ${blueSideSummonersSoloduo[`player2`].summonerName} - ${
              blueSideSummonersSoloduo[`player2`].elo
            }
            ${blueSideSummonersSoloduo[`player3`].summonerName} - ${
              blueSideSummonersSoloduo[`player3`].elo
            }
            ${blueSideSummonersSoloduo[`player4`].summonerName} - ${
              blueSideSummonersSoloduo[`player4`].elo
            }
            ${blueSideSummonersSoloduo[`player5`].summonerName} - ${
              blueSideSummonersSoloduo[`player5`].elo
            }
            `,
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
            ${redSideSummonersSoloduo[`player1`].summonerName} - ${
              redSideSummonersSoloduo[`player1`].elo
            }
            ${redSideSummonersSoloduo[`player2`].summonerName} - ${
              redSideSummonersSoloduo[`player2`].elo
            }
            ${redSideSummonersSoloduo[`player3`].summonerName} - ${
              redSideSummonersSoloduo[`player3`].elo
            }
            ${redSideSummonersSoloduo[`player4`].summonerName} - ${
              redSideSummonersSoloduo[`player4`].elo
            }
            ${redSideSummonersSoloduo[`player5`].summonerName} - ${
              redSideSummonersSoloduo[`player5`].elo
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

      return client.channels
        .fetch(CHANNEL_ID_WHICH_MESSAGE_WILL_BE_SENT)
        .then((channel) => channel.send(botembed));
    } catch (err) {
      return;
    }
  });
};
