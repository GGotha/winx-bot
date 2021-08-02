const { Users } = require("../sequelize/models");
const { format } = require("date-fns");
const Discord = require("discord.js");

const CHANNEL_ID_WHICH_MESSAGE_WILL_BE_SENT =
  process.env.NOTIFICATIONS_CHANNEL_ID;

module.exports = async (client) => {
  try {
    const findUsers = await Users.findAll();

    findUsers.map(async (user) => {
      const currentDatetime = format(new Date(), "yyyy-MM-dd");
      const currentDatetimeDay = currentDatetime.split("-")[2];
      const currentDatetimeMonth = currentDatetime.split("-")[1];
      const currentDate = currentDatetimeDay + "/" + currentDatetimeMonth;

      const userBirthdateDatetime = user.birthdate;
      const userBirthdateDay = userBirthdateDatetime.split("-")[2];
      const userBirthdateMonth = userBirthdateDatetime.split("-")[1];
      const userBirthdate = userBirthdateDay + "/" + userBirthdateMonth;

      if (currentDate !== userBirthdate) {
        return;
      }

      const channel = await client.channels.fetch(
        CHANNEL_ID_WHICH_MESSAGE_WILL_BE_SENT
      );

      const tagEveryone = await channel.send("@everyone");
      tagEveryone.delete();

      let birthdateEmbeded = new Discord.MessageEmbed()
        .setTitle("Feliz aniversário!")
        .setAuthor(`Hoje a nossa WINX está fazendo aniversário!!`)
        .setDescription(
          "Feliz Aniversário! 🎈🍰🎁 " +
            `<@${user.discord_id}> ` +
            "\n\n" +
            " Que seja um dia inesquecível e o início de um novo ano na sua vida cheio de felicidade e muitas realizações."
        )
        .setColor("#FF00FF")
        .setThumbnail(user.discord_url_image);

      return client.channels
        .fetch(CHANNEL_ID_WHICH_MESSAGE_WILL_BE_SENT)
        .then((channel) => channel.send(birthdateEmbeded));
    });
  } catch (err) {
    console.log(err);
    return;
  }
};
