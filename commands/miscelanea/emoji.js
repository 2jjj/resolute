const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "emoji",
  aliases: ['emojiinfo'],
  cooldown: 1000 * 2, 
  description: "Escreva o nome do emoji como argumentos e eu irei enviar o emoji!",
  category: "outros",
  usage: "<emoji_name>",
  example: "emoji SETA",

  async run (client, message, args) {
    
    let emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0]);

    if (!emoji) {
      message.channel.send(
        "`" + args[0] + "` **Não é um emoji deste servidor!**"
      );
    } else if (emoji.animated === true) {
      message.channel.send(`<a:${args[0]}:${emoji.id}>`);
    } else {
      message.channel.send(`<:${args[0]}:${emoji.id}>`);
    }
}
}