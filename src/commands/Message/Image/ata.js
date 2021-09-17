module.exports = {
  name: 'ata',
  aliases: ['atameme'],
  cooldown: 1000 * 2,
  description: 'Ata monica',
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

    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(300, 300)
    const ctx = canvas.getContext('2d')
    const user = args[0] ? message.mentions.users.first() || client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author

    const img = user.displayAvatarURL({
      dynamic: false,
      format: 'png',
      size: 4096
    })
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/841317393409376276/850753736749219871/ata-meme.png')
    const avatar = await Canvas.loadImage(img)
    ctx.drawImage(avatar, 100, 0, 200, 250)
    ctx.drawImage(background, 0, 0)
    const raw = canvas.toBuffer()
    const attachment = new (require('discord.js')).MessageAttachment(raw, `ata-${message.author.id}.png`)
    message.reply({ files: [attach] }).then(a => {
      message.channel.stopTyping()
    })
  }
}
