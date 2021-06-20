const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "wikipedia",
    aliases: ['wiki'],
    cooldown: 1000 * 2, 
    description: "Pesquisar uma wiki na wikipedia.",
    category: "outros",
    usage: "<repo>",
  
    async run (client, message, args) {

  const body = await fetch(
      `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        args.join(" ")
      )}`
    ).then(res => res.json().catch(() => {}));
    if (!body) return message.channel.send("Página não encontrada :x:");
    if (body.title && body.title === "Não encontrado.")
      return message.channel.send("Erro! Página não encontrada ... :x:");

    const embed = new Discord.MessageEmbed()
      //.setTitle(`[${body.title}](${body.content_urls.desktop.page})`)
      .setDescription(`**[${body.title}](${body.content_urls.desktop.page})**\n\n${body.extract}`)
      .setColor("GREEN");
    if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
    message.channel.send(embed);
  }
};