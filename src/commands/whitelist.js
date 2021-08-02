const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");
const { LolWhitelistFindMatches } = require("../sequelize/models");

const DISCORD_COMMAND = "lol_whitelist";

module.exports.run = async (client, message, args) => {
  const loadingMessage = await message.channel.send("Procurando whitelist...");

  try {
    const whitelist = await LolWhitelistFindMatches.findAll();
    var list = [];

    whitelist.map((x) => {
      list.push(x.lol_name);
    });

    const listFormatted = list.join("\n");

    let botembed = new Discord.MessageEmbed()
      .setColor("#FF00FF")
      .setDescription(
        `
      ${!listFormatted ? "Nenhum nome presente na whitelist" : listFormatted}
    `
      )
      .addFields()
      .setTimestamp()
      .setFooter(
        "Since 2014",
        "https://upload.wikimedia.org/wikipedia/pt/4/4f/Winx_Club_Logo.png"
      );

    loadingMessage.delete();
    return message.channel.send(botembed);
  } catch (err) {
    loadingMessage.edit(`Whitelist não encontrada`);
  }
};
module.exports.help = {
  name: DISCORD_COMMAND,
};
