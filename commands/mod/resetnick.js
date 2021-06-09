const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "resetnick",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Resetar o nick de um usuário.",
    category: "mod",
    usage: "",

    async run (client, message, args) {

    const member = message.mentions.members.first();

    if (!member) return message.reply("Especifique o membro.");

    try {
      member.setNickname(null);
    } catch (err) {
      message.reply(
        "Eu não tenho permissão para resetar " + member.toString() + " nickname!"
      );
    }
  },
};