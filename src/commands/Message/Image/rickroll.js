const Discord = require('discord.js')
const Canvas = require('canvas')
module.exports = {
  name: 'rickroll',
  aliases: [],
  cooldown: 1000 * 2,
  description: '',
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

    const member = message.mentions.members.first() || message.member
    if (!member) return
    const canvas = Canvas.createCanvas(867, 892)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.2vpod8Vg5-G5h4kctT83dwHaD4%26pid%3DApi&f=1')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
      format: 'jpg'
    }))

    ctx.drawImage(avatar, 270, 10, 300, 320)
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'resolute.jpg')
    message.reply({ files: [attachment] })
  }
}
