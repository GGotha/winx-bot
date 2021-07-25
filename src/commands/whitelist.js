const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");

const DISCORD_COMMAND = "lol_whitelist";

module.exports.run = async (client, message, args) => {
  const loadingMessage = await message.channel.send("Procurando whitelist...");

  fs.readFile(
    path.join("src", "assets", "whitelist_find_match.txt"),
    "utf-8",
    function (err, data) {
      const formatData = data.split(",").join("\n");

      let botembed = new Discord.MessageEmbed()
        .setColor("#FF00FF")
        .setDescription(
          `
            ${
              formatData === ""
                ? "Nenhum nome presente na whitelist"
                : formatData
            }
          `
        )
        .addFields()
        .setTimestamp()
        .setFooter(
          "Since 2014",
          "https://upload.wikimedia.org/wikipedia/pt/4/4f/Winx_Club_Logo.png"
        );

      return message.channel.send(botembed);
    }
  );

  try {
    loadingMessage.delete();
  } catch (err) {
    loadingMessage.edit(`Whitelist não encontrada`);
  }
};
module.exports.help = {
  name: DISCORD_COMMAND,
};
