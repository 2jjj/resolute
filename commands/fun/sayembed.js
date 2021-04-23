const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const user = message.author; //trocar user por message.author
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
  const sayMessage = args.join(' ') //pegar os args (coração)
  if(!sayMessage) {
    message.reply('falta o que você vai falar!') //se apenas colocar sayembed
  } else {
  const say = new Discord.MessageEmbed() //se tiver tudo bonitin:
  .setAuthor(user.tag, avatar)
  .setDescription(sayMessage)
  message.delete()
  message.channel.send(say)
  }
}