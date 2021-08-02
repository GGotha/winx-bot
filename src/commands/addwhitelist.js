const { LolWhitelistFindMatches } = require("../sequelize/models");

const DISCORD_COMMAND = "lol_addwhitelist";

module.exports.run = async (client, message, args) => {
  const userMessage = message.content.split(DISCORD_COMMAND);
  const lolNickname = userMessage[1].trim();
  const loadingMessage = await message.channel.send(
    "Adicionando a whitelist..."
  );

  try {
    const [user, created] = await LolWhitelistFindMatches.findOrCreate({
      where: { lol_name: lolNickname },
      defaults: {
        created_at: new Date(),
      },
    });

    if (!created) {
      loadingMessage.delete();
      return await message.channel.send(
        `${lolNickname} já está adicionado a whitelist`
      );
    }

    loadingMessage.delete();
    await message.channel.send(`${lolNickname} adicionado a whitelist`);
  } catch (err) {
    loadingMessage.edit(`Não foi possível adicionar a whitelist`);
  }
};
module.exports.help = {
  name: DISCORD_COMMAND,
};
