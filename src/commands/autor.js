const discord = require("discord.js");

(module.exports.run = async (client, message, args) => {
  // TODO: verificar o que fazer com possivel erro
  message.delete(5000).catch(() => {});

  let gotha = `${message.author}`;

  let botembed = new discord.RichEmbed()

    .setDescription(
      "Meu criador, fui desenvolvida em javascript, mas especificamente node.js.\n OBS: A foto do meu criador, ele só tem essa foto"
    )
    .setColor("#FF00FF")
    .setAuthor("Criado por Gotha")
    .setImage(
      (url =
        "https://cdn.discordapp.com/attachments/558112016771055626/558330513191075840/A67Jal5.jpg")
    )
    .setTimestamp()
    .setFooter(
      "Since 2014",
      "https://upload.wikimedia.org/wikipedia/pt/4/4f/Winx_Club_Logo.png"
    );
  return message.channel.send(botembed);
}),
  (module.exports.help = {
    name: "autor"
  });
