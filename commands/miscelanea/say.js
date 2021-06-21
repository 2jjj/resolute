const Discord = require('discord.js')
const db = require("quick.db");

module.exports = {
  name: "say",
  aliases: [],
  cooldown: 1000 * 2, 
  description: "Faça eu falar algo!",
  category: "fun",
  usage: "<texto>",

  async run (client, message, args) {
  
    const user = message.author;
    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
    const sayMessage = args.join(' ') 
    if(!sayMessage) {
      message.reply('Você não especificou a mensagem para eu falar!') 
    } else {
    const say = new Discord.MessageEmbed()
    .setAuthor(user.tag, avatar)
    .setDescription(sayMessage)
    message.delete()
    message.channel.send(say)
    }
}}