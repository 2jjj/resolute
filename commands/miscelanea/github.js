const Discord = require("discord.js");

module.exports = {
  name: "github",
  aliases: ['repo'],
  cooldown: 1000 * 2, 
  description: "Pesquisar um repositório no github.",
  category: "outros",
  usage: "<repo>",

  async run (client, message, args) {
    
    let repo = args.join(" ");

    if (!repo) return message.channel.send(`> ⛔ | ${message.author}, Você deve falar um repositório para eu pesquisar no github.`);

    message.channel.send(`Repositório encontrado -> https://github.com/${repo}`)
  }
}
