const Discord = require("discord.js");

module.exports = {
  name: "botinfo",
  aliases: ['sobre', 'bot', 'aboutbot'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "info",
  usage: "",

  async run (client, message, args) {
    
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

    let { version } = require("discord.js");
    var numWorkers = require('os').cpus().length;

    let embed = new Discord.MessageEmbed()
    .setTitle("**Resolute - Botinfo**")
    .setColor("RANDOM")
    .setThumbnail(avatar)
    .addFields(
      { name: 'ﾠ', value: '<a:SETA:852194614927818812> **Desenvolvedor:** <@836345581424738354>' },
      { name: 'ﾠ', value: `<a:SETA:852194614927818812> **Bot criado no dia:** **11/10/2020**`, inline: false },
      { name: 'ﾠ', value: `<a:SETA:852194614927818812> **Estou em ${client.guilds.cache.size} servidores!**`, inline: false },
      { name: 'ﾠ', value: `<a:SETA:852194614927818812> **Versão Discord.js:** **${version}**`, inline: false },
      { name: 'ﾠ', value: `<a:SETA:852194614927818812> **Versão Node.JS:** **${process.version}**`, inline: false },
      { name: 'ﾠ', value: `<a:SETA:852194614927818812> **Estou na versão** **1.7.0B**`, inline: false },
      { name: 'ﾠ', value: `<a:SETA:852194614927818812> [Me adicione!](https://resolutebot.xyz)`, inline: false },
    )
    await message.channel.send(embed);
}
}