const Discord = require("discord.js");

module.exports = {
  name: "uptime",
  aliases: ['up', 'uptime'],
  cooldown: 3000 * 5, 
  description: "Uptime do bot",
  category: "info",
  usage: "",
  example: "",

  async run (client, message, args) {

    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let uptime = `<a:SETA:852194614927818812> ${days.toFixed()} dias\n<a:SETA:852194614927818812> ${hours.toFixed()} horas\n<a:SETA:852194614927818812> ${minutes.toFixed()} minutos\n<a:SETA:852194614927818812> ${seconds.toFixed()} segundos`;

    const embed = new Discord.MessageEmbed()
      .setTitle(`Tempo de atividade`)
      //.setThumbnail("https://imgur.com/WZMylbw.gif")
      .setColor("RANDOM")
      .setDescription(`${uptime}`)
    message.channel.send(embed);
}}