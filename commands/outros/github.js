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
    
    let repo = args.join(" ");

    if (!repo) return message.channel.send(`⛔ | ${message.author}, Você deve falar um repositório para eu pesquisar no github!`);

    message.channel.send(`Repositório encontrado -> https://github.com/${repo}`)
  }
}
