const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "botinfo",
  aliases: ['sobre', 'bot', 'aboutbot'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "info",
  usage: "",

  async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }
    
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

    let { version } = require("discord.js");
    var numWorkers = require('os').cpus().length;

    let embed = new Discord.MessageEmbed()
    .setTitle("**Resolute - Botinfo**")
    .setColor("RANDOM")
    .setThumbnail(avatar)
    .addFields(
      { name: 'ﾠ', value: '<:ybs_dev:851954427572912149> | **Desenvolvedor:** <@836345581424738354>, <@798574984582791208>' },
      { name: 'ﾠ', value: `<:ybs_config:851954339735666729> | **Bot criado no dia:** **11/10/2020**`, inline: false },
      { name: 'ﾠ', value: `<:ybs_duvida:851954411348820018> | **Estou em ${client.guilds.cache.size} servidores!**, **com ${client.users.cache.size} pessoas!**`, inline: false },
      { name: 'ﾠ', value: `<:3434_Discord_js_logo:845779460899733553> | **Versão discord.js:** **${version}**`, inline: false },
      { name: 'ﾠ', value: `<:node:845780252940959744> | **Versão Node.JS:** **${process.version}**`, inline: false },
      { name: 'ﾠ', value: `<:ybs_status:851954702840627200> | **Estou na versão** **1.7.0B**`, inline: false },
      { name: 'ﾠ', value: `<:ybs_bot:851955104345227294> | [Me adicione!](https://resolutebot.xyz)`, inline: false },
    )
    await message.channel.send(embed);
}
}