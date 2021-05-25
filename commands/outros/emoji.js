const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "emoji",
  aliases: ['emojiinfo'],
  cooldown: 1000 * 2, 
  description: "emoji",
  category: "outros",

  async run (client, message, args) {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."
  
  message.delete();
  if (!args[0])
    return message.channel.send(
      `**<:Resoluteinfo:844971535927083088> | ${message.author.username}, A sintaxe correta é:** ` +
        "`" +
        `${prefix}emoji <emoji>`
    ); 
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