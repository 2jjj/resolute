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

    if (!repo) return message.channel.send(`\<:1926blurplecross:856520144872407060> **|** ${message.author}, Você deve falar um repositório para eu pesquisar no github.`);

    message.channel.send(`<:5864blurplesearch:856520144817881118> **|** Repositório encontrado -> https://github.com/${repo}`)
  }
}
