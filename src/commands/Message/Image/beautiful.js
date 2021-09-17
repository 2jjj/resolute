const DIG = require('discord-image-generation')
const Discord = require('discord.js')

module.exports = {
  name: 'beautiful',
  aliases: ['lindo'],
  cooldown: 1000 * 2,
  description: 'Limdo.dá.vò',
  category: 'manipulacao',
  usage: '@user',
  example: '',
  permissoes: {
    membro: [],
    bot: ['ATTACH_FILES', 'Anexar arquivos']
  },
  args: false,

  async run (client, message, args) {
    if (!message.guild.me.permissions.has(`${Discord.Permissions}.FLAGS.${module.exports.permissoes[0]}`)) return

    const user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member
    const avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: 'png'
    })

    const img = await new DIG.Beautiful().getImage(avatar)

    const attach = new Discord.MessageAttachment(img, 'resolute.png')
    message.reply({ files: [attach] })
  }
}
