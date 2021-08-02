const { LolWhitelistFindMatches } = require("../sequelize/models");

const DISCORD_COMMAND = "lol_removewhitelist";

module.exports.run = async (client, message, args) => {
  const userMessage = message.content.split(DISCORD_COMMAND);
  const lolNickname = userMessage[1].trim();
  const loadingMessage = await message.channel.send(
    `Removendo ${lolNickname} da whitelist...`
  );

  try {
    const LolWhitelistFindMatch = await LolWhitelistFindMatches.findOne({
      where: { lol_name: lolNickname },
    });

    if (!LolWhitelistFindMatch) {
      loadingMessage.delete();

      return await message.channel.send(
        `Não foi possível encontrar ${lolNickname} na whitelist`
      );
    }

    await LolWhitelistFindMatch.destroy();

    loadingMessage.delete();

    return await message.channel.send(
      `${lolNickname} foi removido da whitelist`
    );
  } catch (err) {
    loadingMessage.edit(`Não foi possível remover ${lolNickname} da whitelist`);
  }
};
module.exports.help = {
  name: DISCORD_COMMAND,
};
