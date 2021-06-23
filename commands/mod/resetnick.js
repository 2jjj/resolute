const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const Discord = require("discord.js");


module.exports = {
    name: "resetnick",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Resetar o nick de um usuário.",
    category: "mod",
    usage: "",

    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const member = message.mentions.members.first();

    if (!member) {
      const help = new Discord.MessageEmbed()
      .setTitle("Comando de resetnick")
      .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
      .setDescription("Resete o nick de um usuário")
      .addField(`Forma de Utilização:`, `<:pontin:852197383974551582> \`${prefix}resetnick @user\``)
      .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
      .setColor("RANDOM")
      .setTimestamp();
      return message.channel.send(help);
    }

    try {
      member.setNickname(null);
    } catch (err) {
      message.channel.send(
        "<:x_:856894534071746600> **|** Eu não tenho permissão para resetar " + member.toString() + " nickname!"
      );
    }
  },
};