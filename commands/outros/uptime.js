const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `🗓️ ${days.toFixed()} dias\n🗓️ ${hours.toFixed()} horas\n🗓️ ${minutes.toFixed()} minutos\n🗓️ ${seconds.toFixed()} segundos`;

  const embed = new Discord.MessageEmbed()
    .setTitle(`<:3999activity:837769393290477629> Tempo de atividade 🕰️`)
    .setThumbnail("https://imgur.com/WZMylbw.gif")
    .setColor("#FF0000")
    .setDescription(`**<:info:835206734225473546> Estou online há:**\n${uptime}`)

  message.channel.send(embed);
};
