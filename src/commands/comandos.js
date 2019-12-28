const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const m = await message.author.send("Carregando...");
  const member = message.mentions.users.first() || message.author;
  m.edit("```Lista de Comandos\n-wx!ping\n-wx!fudo\n-wx!autor```");
  message.delete(2000).catch(() => {});
};
module.exports.help = {
  name: "comandos",
  description: "Mostrará os comandos do bot"
};
