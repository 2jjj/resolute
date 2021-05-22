const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `<:setaazul:843588568605523969> ${days.toFixed()} dias\n<:setaazul:843588568605523969> ${hours.toFixed()} horas\n<:setaazul:843588568605523969> ${minutes.toFixed()} minutos\n<:setaazul:843588568605523969> ${seconds.toFixed()} segundos`;

  const embed = new Discord.MessageEmbed()
    .setTitle(`<:Resoluteinfo:844971535927083088> Tempo de atividade`)
    //.setThumbnail("https://imgur.com/WZMylbw.gif")
    .setColor("#FF0000")
    .setDescription(`**<:N3UP_Servers:845357935155478548> Estou online a **\n${uptime}`)

  message.channel.send(embed);
};

