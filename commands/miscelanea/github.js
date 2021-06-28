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

    message.channel.send(`<:5864blurplesearch:856520144817881118> **|** Repositório encontrado -> https://github.com/${repo}`)
  }
}
