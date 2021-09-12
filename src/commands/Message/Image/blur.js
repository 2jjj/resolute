const DIG = require('discord-image-generation')
const Discord = require('discord.js')

module.exports = {
  name: 'blur',
  aliases: ['blurmeme'],
  cooldown: 1000 * 2,
  description: 'Blur',
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

    const user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member
    const avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: 'png'
    })

    const img = await new DIG.Blur().getImage(avatar)

    const attach = new Discord.MessageAttachment(img, 'blur.png')
    message.reply({ files: [attach] })
  }
}
