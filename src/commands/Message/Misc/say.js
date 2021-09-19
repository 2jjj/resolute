const Discord = require('discord.js')

module.exports = {
  name: 'say',
  aliases: [],
  cooldown: 1000 * 2,
  description: 'Com esse comando eu posso falar oque você deseja por embed!',
  category: 'misc',
  usage: '<texto>',
  example: 'Olá',
  permissoes: [],
  args: true,

  async run (client, message, args) {
    if (!args[0]) return

    const user = message.author
    const avatar = user.avatarURL({
      dynamic: true,
      format: 'png',
      size: 1024
    })
    const sayMessage = args.join(' ')

    const say = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setAuthor(user.tag, avatar)
      .setDescription(sayMessage)
    //message.delete()
    message.reply({ embeds: [say] })
  }
}
