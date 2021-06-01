const Discord = require('discord.js')
const db = require("quick.db");

module.exports = {
  name: "say",
  aliases: [],
  cooldown: 1000 * 2, 
  description: "dev",
  category: "fun",

async run (client, message, args) {
  
  const user = message.author;
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
  const sayMessage = args.join(' ') 
  if(!sayMessage) {
    message.reply('<:info:835206734225473546> | Falta o que você vai falar!') 
  } else {
  const say = new Discord.MessageEmbed()
  .setAuthor(user.tag, avatar)
  .setDescription(sayMessage)
  message.delete()
  message.channel.send(say)
  }
}}