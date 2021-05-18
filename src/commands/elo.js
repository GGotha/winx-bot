const Discord = require("discord.js");
const api = require("../api/axios");
const path = require("path");

const DISCORD_COMMAND = "lol_elo";

module.exports.run = async (client, message, args) => {
  const userMessage = message.content.split(DISCORD_COMMAND)[1];

  const loadingMessage = await message.channel.send("Procurando dados...");

  try {
    const getSummonerBySummonerName = await api.get(
      `/lol/summoner/v4/summoners/by-name/${userMessage}`
    );

    const summonerId = getSummonerBySummonerName.data.id;
    const summonerName = getSummonerBySummonerName.data.name;
    const summonerLevel = getSummonerBySummonerName.data.summonerLevel;
    const summonerIcon = getSummonerBySummonerName.data.profileIconId;

    const embedSummonerIcon = `http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${summonerIcon}.png`;

    const getInfoSummonerBySummonerId = await api.get(
      `/lol/league/v4/entries/by-summoner/${summonerId}`
    );

    const soloDuo = getInfoSummonerBySummonerId?.data.filter((rank) => {
      return rank.queueType === "RANKED_SOLO_5x5";
    });

    const flex = getInfoSummonerBySummonerId?.data.filter((rank) => {
      return rank.queueType === "RANKED_FLEX_SR";
    });

    var embedImage;
    var embedPathImage;
    if (soloDuo.length <= 0) {
      embedImage = "Emblem_Unranked";
      embedPathImage = path.resolve(
        "src",
        "assets",
        "elo",
        "Emblem_Unranked.png"
      );
    }
    if (soloDuo[0]?.tier === "Iron") {
      embedImage = "Emblem_Iron";
      embedPathImage = path.resolve("src", "assets", "elo", "Emblem_Iron.png");
    }
    if (soloDuo[0]?.tier === "BRONZE") {
      embedImage = "Emblem_Bronze";
      embedPathImage = path.resolve(
        "src",
        "assets",
        "elo",
        "Emblem_Bronze.png"
      );
    }
    if (soloDuo[0]?.tier === "SILVER") {
      embedImage = "Emblem_Silver";
      embedPathImage = path.resolve(
        "src",
        "assets",
        "elo",
        "Emblem_Silver.png"
      );
    }
    if (soloDuo[0]?.tier === "GOLD") {
      embedImage = "Emblem_Gold";
      embedPathImage = path.resolve("src", "assets", "elo", "Emblem_Gold.png");
    }
    if (soloDuo[0]?.tier === "PLATINUM") {
      embedImage = "Emblem_Platinum";
      embedPathImage = path.resolve(
        "src",
        "assets",
        "elo",
        "Emblem_Platinum.png"
      );
    }
    if (soloDuo[0]?.tier === "DIAMOND") {
      embedImage = "Emblem_Diamond";
      embedPathImage = path.resolve(
        "src",
        "assets",
        "elo",
        "Emblem_Diamond.png"
      );
    }
    if (soloDuo[0]?.tier === "MASTER") {
      embedImage = "Emblem_Master";
      embedPathImage = path.resolve(
        "src",
        "assets",
        "elo",
        "Emblem_Master.png"
      );
    }
    if (soloDuo[0]?.tier === "GRANDMASTER") {
      embedImage = "Emblem_Grandmaster";
      embedPathImage = path.resolve(
        "src",
        "assets",
        "elo",
        "Emblem_Grandmaster.png"
      );
    }
    if (soloDuo[0]?.tier === "CHALLENGER") {
      embedImage = "Emblem_Challenger";
      embedPathImage = path.resolve(
        "src",
        "assets",
        "elo",
        "Emblem_Challenger.png"
      );
    }

    let botembed = new Discord.MessageEmbed()
      .setColor("#FF00FF")
      .setAuthor(summonerName)
      .setDescription(
        `
        Level: ${summonerLevel}
        
        ${
          soloDuo.length <= 0 && flex.length <= 0
            ? "Unranked"
            : `Solo Duo: ${soloDuo[0].tier} ${soloDuo[0].rank} ${soloDuo[0].leaguePoints} PDL \n Vitórias ${soloDuo[0].wins} \n Derrotas ${soloDuo[0].losses} \n\n Flex: ${flex[0].tier} ${flex[0].rank} ${flex[0].leaguePoints} PDL \n Vitórias ${flex[0].wins} \n Derrotas ${flex[0].losses}`
        }
        `
      )
      .setThumbnail(`attachment://${embedImage}.png`)
      .attachFiles([embedPathImage])
      .setImage(embedSummonerIcon)
      .setTimestamp()
      .setFooter(
        "Since 2014",
        "https://upload.wikimedia.org/wikipedia/pt/4/4f/Winx_Club_Logo.png"
      );

    loadingMessage.delete();
    return message.channel.send(botembed);
  } catch (err) {
    console.log(err);
    loadingMessage.edit(`Invocador não encontrado`);
  }
};
module.exports.help = {
  name: DISCORD_COMMAND,
};
