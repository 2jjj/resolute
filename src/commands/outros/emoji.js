const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."
  
  message.delete();
  if (!args[0])
    return message.channel.send(
      `**${message.author.username}, A sintaxe correta é:** ` +
        "`" +
        `${prefix}emoji <emoji>`
    ); 
  let emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0]);

  if (!emoji) {
    message.channel.send(
      "`" + args[0] + "` **Não é um emoji deste servidor.**"
    );
  } else if (emoji.animated === true) {
    message.channel.send(`<a:${args[0]}:${emoji.id}>`);
  } else {
    message.channel.send(`<:${args[0]}:${emoji.id}>`);
  }
};

