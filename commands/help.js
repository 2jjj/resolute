const Discord = require('discord.js');
const config = require("../commands.json");

exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author; 
  let avatar = user.displayAvatarURL({ dynamic: true, size: 4096 })

  let embed_3 = new Discord.MessageEmbed()
  .setColor('#e1ff00')
  .setDescription(`> **<a:__:835643988022263879> Olá ${message.author}, aqui estão algumas informações!**\n\n
    > <a:__:835643988022263879> Website
    **http://spr4y.xyz/resolute**

    > <:info:835206734225473546> Lista de comandos
    **http://spr4y.xyz/resolute#commands**
  `)
  .setImage(avatar)
  .setThumbnail(avatar)
  message.channel.send(embed_3)
  
}