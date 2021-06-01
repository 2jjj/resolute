const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "github",
  aliases: ['repo'],
  cooldown: 1000 * 2, 
  description: "github repo",
  category: "outros",

  async run (client, message, args) {
    
    let repo = args.join(" ");

    if (!repo) return message.channel.send(`> ⛔ | ${message.author}, Você deve falar um repositório para eu pesquisar no github.`);

    message.channel.send(`Repositório encontrado -> https://github.com/${repo}`)
  }
}
