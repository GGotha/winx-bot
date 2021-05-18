const Discord = require("discord.js");
const api = require("../api/axios");
const path = require("path");

const DISCORD_COMMAND = "lol_match";

const BLUE_SIDE_ID = 100;
const RED_SIDE_ID = 200;
const NORMAL_GAME = 400;
const RANKED_GAME = 420;

module.exports.run = async (client, message, args) => {
  const userMessage = message.content.split(DISCORD_COMMAND)[1];

  const loadingMessage = await message.channel.send("Procurando partida...");

  try {
    const getSummonerBySummonerName = await api.get(
      `/lol/summoner/v4/summoners/by-name/${userMessage}`
    );

    const summonerId = getSummonerBySummonerName.data.id;
    const summonerName = getSummonerBySummonerName.data.name;
    const summonerLevel = getSummonerBySummonerName.data.summonerLevel;
    const summonerIcon = getSummonerBySummonerName.data.profileIconId;

    const embedSummonerIcon = `http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${summonerIcon}.png`;

    const getInfoSpectate = await api.get(
      `/lol/spectator/v4/active-games/by-summoner/${summonerId}`
    );

    const blueSideParticipants = getInfoSpectate.data.participants.filter(
      (participant) => {
        return participant.teamId === BLUE_SIDE_ID;
      }
    );
    const redSideParticipants = getInfoSpectate.data.participants.filter(
      (participant) => {
        return participant.teamId === RED_SIDE_ID;
      }
    );

    const getInfoBlueParticipantOne = await api.get(
      `/lol/league/v4/entries/by-summoner/${blueSideParticipants[0].summonerId}`
    );

    console.log(getInfoBlueParticipantOne.data);

    const soloDuoBlueParticipantOne = getInfoBlueParticipantOne?.data.filter(
      (rank) => {
        return rank.queueType === "RANKED_SOLO_5x5";
      }
    );

    var embedImage;
    var embedPathImage;

    if (soloDuoBlueParticipantOne[0]?.tier === "PLATINUM") {
      embedImage = "Emblem_Platinum";
      embedPathImage = path.resolve(
        "src",
        "assets",
        "elo",
        "Emblem_Platinum.png"
      );
    }

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
          value: `:blue_circle: ${blueSideParticipants[0].summonerName} \n ${blueSideParticipants[1].summonerName} \n ${blueSideParticipants[2].summonerName} \n ${blueSideParticipants[3].summonerName} \n ${blueSideParticipants[4].summonerName}`,
          inline: true,
        },
        {
          name: "\u200b",
          value: "\u200b",
          inline: false,
        },
        {
          name: "Red Side",
          value: `${redSideParticipants[0].summonerName} \n ${redSideParticipants[1].summonerName} \n ${redSideParticipants[2].summonerName} \n ${redSideParticipants[3].summonerName} \n ${redSideParticipants[4].summonerName}`,
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
