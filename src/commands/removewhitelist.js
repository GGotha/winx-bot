const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");

const DISCORD_COMMAND = "lol_removewhitelist";

module.exports.run = async (client, message, args) => {
  const userMessage = message.content.split(DISCORD_COMMAND);
  const lolNickname = userMessage[1].trim();
  const loadingMessage = await message.channel.send(
    `Removendo ${lolNickname} da whitelist...`
  );

  try {
    fs.readFile(
      path.join("src", "assets", "whitelist_find_match.txt"),
      "utf-8",
      async function (err, data) {
        const arrayNames = data.split(",");

        const index = arrayNames.indexOf(lolNickname);

        if (index > -1) {
          arrayNames.splice(index, 1);

          fs.writeFile(
            path.join("src", "assets", "whitelist_find_match.txt"),
            arrayNames.toString(),
            function (err) {
              if (err) return console.log(err);
            }
          );

          loadingMessage.delete();

          return await message.channel.send(
            `${lolNickname} removido da whitelist`
          );
        }

        loadingMessage.delete();

        return await message.channel.send(
          `Não foi possível encontrar ${lolNickname} na whitelist`
        );
      }
    );
  } catch (err) {
    loadingMessage.edit(`Não foi possível remover ${lolNickname} da whitelist`);
  }
};
module.exports.help = {
  name: DISCORD_COMMAND,
};
