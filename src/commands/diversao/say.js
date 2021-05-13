const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  
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
}