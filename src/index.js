const Discord = require("discord.js");
const { UserConnection } = require("discord.js");
const fs = require("fs");

require("dotenv").config();

const client = new Discord.Client();
client.prefix = process.env.WX_PREFIX;
client.commands = new Discord.Collection();

fs.readdir("./src/commands", (error, files) => {
  if (error) console.log(error);

  var jsfile = files.filter(f => f.split(".").pop() === "js");
  console.log("jsfile:", jsfile);
  if (jsfile.length <= 0) {
    console.log("não encontrei comandos");
    return;
  }
  jsfile.forEach((f, i) => {
    console.log("f:", f);
    var props = require(`./commands/${f}`);
    console.log(`Carregou o comando ${f}`);
    client.commands.set(props.help.name, props);
  });
});

client.on("ready", () => {
  console.log(
    "Bot iniciado! \n\n Users: " +
      client.users.size +
      "\n Servidores: " +
      client.guilds.size
  );
  client.user.setPresence({
    status: "online",
    game: {
      name: "WINX ep.1",
      type: "STREAMING",
      url: "https://www.twitch.tv/gothaxd"
    }
  });
});

client.on("message", async message => {
  let msg = message.content.toLowerCase();
  if (message.author.bot) {
    return undefined;
  }

  const args = message.content
    .slice("wx!".length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let commandFile = client.commands.get(command);
  if (commandFile) commandFile.run(client, message, args);
});

// AUTO ROLE

client.on(`guildMemberAdd`, member => {
  console.log("Usuario " + member.user.username + " entrou no servidor");

  member.addRole("558062306282438685");

  if (member) {
    console.log("Mensagem de entrada enviada para o usuario");
    member.send(
      "```Bem-Vindo ao WINX Team! Eu sou o BOT principal do servidor, qualquer dúvida só chamar um adm\n\nPara me chamar só digitar wx!comandos, no canal BOT, no meu servidor```"
    );
  } else {
    console.log("deu errado");
  }
});

console.log(UserConnection);

client.login(process.env.WX_TOKEN);
