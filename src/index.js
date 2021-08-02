const path = require("path");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env." + process.env.NODE_ENV),
});

const Discord = require("discord.js");
const fs = require("fs");
const cron = require("node-cron");
const findMatchForSpecificUser = require("./tasks/findMatchForSpecificUser");
const birthdateNotify = require("./tasks/birthdateNotify");

const client = new Discord.Client();
client.prefix = process.env.PREFIX;
client.commands = new Discord.Collection();

fs.readdir("./src/commands", (error, files) => {
  if (error) console.log(error);

  var jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    return;
  }
  jsfile.forEach((f, i) => {
    var props = require(`./commands/${f}`);

    client.commands.set(props.help.name, props);
  });
});

client.on("ready", async () => {
  cron.schedule("*/30 * * * * *", () => {
    findMatchForSpecificUser(client);
  });

  cron.schedule(
    "0 12 * * *",
    () => {
      birthdateNotify(client);
    },
    {
      scheduled: true,
      timezone: "America/Sao_Paulo",
    }
  );

  const infoUser = await (
    await client.users.fetch("142064584906375168")
  ).avatarURL();

  console.log("fetch", infoUser);

  console.log("Bot iniciado!");

  client.user.setPresence({
    status: "online",
    game: {
      name: "WINX ep.1",
      type: "STREAMING",
      url: "https://www.twitch.tv/ggotha",
    },
  });
});

client.on("message", async (message) => {
  message.content.toLowerCase();
  if (message.author.bot) {
    return undefined;
  }

  const args = message.content
    .slice(`${process.env.PREFIX}!`.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let commandFile = client.commands.get(command);
  if (commandFile) commandFile.run(client, message, args);
});

client.on("raw", (event) => {
  const roleLiderForCheckPermission = "307686764149997568";
  const eventNameT = event.t;
  const eventNameD = event.d;

  if (eventNameT === "MESSAGE_REACTION_ADD") {
    if (eventNameD.member.roles[0] === roleLiderForCheckPermission) {
      switch (eventNameD.emoji.name) {
        case "winx":
          memberObject.addRole("307686762250108929");
          console.log("add winx");
        case "friends":
          memberObject.addRole("307887644518645761");
          console.log("add friends");
        case "varinha":
          memberObject.addRole("558062306282438685");
          console.log("add comum");
      }
    }
  }

  if (eventNameT === "MESSAGE_REACTION_REMOVE") {
    if (eventNameD.user_id === "273305955314302976") {
      switch (eventNameD.emoji.name) {
        case "winx":
          memberObject.removeRole("307686762250108929");
          console.log("remove winx");
        case "friends":
          memberObject.removeRole("307887644518645761");
          console.log("remove friends");
        case "varinha":
          memberObject.removeRole("558062306282438685");
          console.log("remove comum");
      }
    }
  }
});

let memberObject = "";

client.on("guildMemberAdd", (member) => {
  memberObject = member;

  const thumbLogo = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatarURL}.png`;
  const thumbLogoSplit = thumbLogo.split("https://")[2];

  async function sendEmbedWhenMemberJoinOnServer() {
    let welcomeEmbed = new Discord.RichEmbed()
      .setTitle("Entrou no servidor")
      .addBlankField()
      .setDescription(
        "O usuário " + "<@" + member.user.id + ">" + " entrou no servidor"
      )
      .setColor("#36393E")
      .setThumbnail("https://" + thumbLogoSplit)
      .setTimestamp();

    const getChannelByIdAndSendWelcomeMessage = await client.channels
      .get("609872424028078081")
      .send(welcomeEmbed);
    await getChannelByIdAndSendWelcomeMessage.react("658906811554070528");
    await getChannelByIdAndSendWelcomeMessage.react("659118341721554974");
    await getChannelByIdAndSendWelcomeMessage.react("658906493248208896");
  }

  sendEmbedWhenMemberJoinOnServer();

  if (member) {
    console.log("Mensagem de entrada enviada para o usuario");

    let welcomePrivateMessageForMember = new Discord.RichEmbed()
      .setTitle(
        "Bem-Vindo ao WINX Team! Eu sou o BOT principal do servidor, qualquer dúvida só chamar um adm\n\nPara me chamar, digite `wx!comandos`, no canal BOTS"
      )
      .setColor("#36393E");

    member.send(welcomePrivateMessageForMember);
  }
});

client.login(process.env.TOKEN);
