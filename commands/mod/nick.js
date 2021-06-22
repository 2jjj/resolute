const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "nick",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Setar Nickname",
    category: "mod",
    usage: "",

    async run (client, message, args) {

    const member = message.mentions.members.first();

    if (!member) return message.reply("<:ybs_mencao:851954512540991490> **|** Especifique o usuário.");

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("Especifique o nickname que deseja colocar!");

    try {
      member.setNickname(arguments);
    } catch (err) {
      console.log(err);
      message.reply(
        "<:x_:856894534071746600> **|** Eu não tenho permissão de setar " + member.toString() + " nickname!"
      );
    }
  },
};