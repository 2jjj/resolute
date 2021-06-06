const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "emoji",
  aliases: ['emojiinfo'],
  cooldown: 1000 * 2, 
  description: "Pegar a imagem de um emoji pelo nome.",
  category: "outros",
  usage: "<emoji_name>",

  async run (client, message, args) {

    console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }
    
  message.delete();
  if (!args[0])
    return message.channel.send(
      `**> ${message.author.username}, A sintaxe correta é:** ` +
        "`" +
        `${prefix}emoji <emoji_name>`
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