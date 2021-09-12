const Discord = require('discord.js')

module.exports = {
  name: 'palhaco',
  aliases: ['clown'],
  cooldown: 1000 * 2,
  description: 'Palhaço!',
  category: 'manipulacao',
  usage: '@user',
  example: '',
  permissoes: {
    membro: [],
    bot: ['ATTACH_FILES', 'Anexar arquivos']
  },
  args: false,

  async run (client, message, args) {
    if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return

    const user = message.mentions.members.first() || message.member
    const msg = await message.channel.send('Carregando...')
    const att = new Discord.MessageAttachment(`https://api.popcatdev.repl.co/clown?image=${user.user.displayAvatarURL({ dynamic: false, format: 'png' })}`, `${user.user.username}_clown.png`)

    message.reply({ files: [att] })
    msg.delete()
  }
}
