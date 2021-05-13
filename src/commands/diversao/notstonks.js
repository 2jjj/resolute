const Discord = require('discord.js')

exports.run = async (client, message, args) => {

   let prefix = db.get(`prefix_${message.guild.id}`)
   if (prefix === null) prefix = "s."

   var list = [
      'https://imgur.com/qPzrtI3.gif',
      'https://imgur.com/DA1TD46.gif'
   ]

   var rand = list[Math.floor(Math.random() * list.length)]

   var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setImage(rand)
   await message.inlineReply(embed)
}