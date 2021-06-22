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

    if (!member) return message.reply("<:ybs_mencao:851954512540991490> **|** Especifique o membro que deseja resetar o nick.");

    try {
      member.setNickname(null);
    } catch (err) {
      message.reply(
        "<:x_:856894534071746600> **|** Eu não tenho permissão para resetar " + member.toString() + " nickname!"
      );
    }
  },
};