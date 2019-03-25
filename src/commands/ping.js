const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const m = await message.channel.send("Calculando...");
    m.edit(`\nSeu ping para o servidor é: **${m.createdTimestamp - message.createdTimestamp}**ms.\nSeu ping para o cliente é: **${Math.round(client.ping)}**ms`);
    message.delete(8000).catch(() => {});
    m.delete(8000).catch(() => {});
}
module.exports.help = {
    name: "ping"
}