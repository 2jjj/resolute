const Discord = require('discord.js')
const db = require("quick.db");

exports.run = async (client, message, args) => {

   let prefix = db.get(`prefix_${message.guild.id}`)
   if (prefix === null) prefix = "s."

   var list = [
      'https://imgur.com/qPzrtI3.gif',
      'https://i.redd.it/p4oj8jsgj3551.png'
   ]

   var rand = list[Math.floor(Math.random() * list.length)]

   var embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setImage(rand)
   await message.inlineReply(embed)
}