const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");

const DISCORD_COMMAND = "lol_addwhitelist";

module.exports.run = async (client, message, args) => {
  const userMessage = message.content.split(DISCORD_COMMAND);
  const lolNickname = userMessage[1].trim();
  const loadingMessage = await message.channel.send(
    "Adicionando a whitelist..."
  );

  try {
    fs.readFile(
      path.join("src", "assets", "whitelist_find_match.txt"),
      "utf-8",
      async function (err, data) {
        const arrayNames = data.split(",");

        const alreadyExistsThisName = arrayNames.filter((name) => {
          return name === lolNickname;
        });

        if (alreadyExistsThisName.length > 0) {
          loadingMessage.delete();
          await message.channel.send(
            `${lolNickname} já está adicionado a whitelist`
          );
          return;
        }

        const newContentWhitelistNames = data + `,${lolNickname}`;

        fs.writeFile(
          path.join("src", "assets", "whitelist_find_match.txt"),
          newContentWhitelistNames,
          function (err) {
            if (err) return console.log(err);
          }
        );

        loadingMessage.delete();

        await message.channel.send(`${lolNickname} adicionado a whitelist`);
      }
    );
  } catch (err) {
    loadingMessage.edit(`Não foi possível adicionar a whitelist`);
  }
};
module.exports.help = {
  name: DISCORD_COMMAND,
};
