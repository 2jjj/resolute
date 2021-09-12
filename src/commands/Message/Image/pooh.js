const Discord = require('discord.js')
module.exports = {
  name: 'pooh',
  aliases: [],
  cooldown: 1000 * 2,
  description: 'Pooh meme',
  category: 'manipulacao',
  usage: '<texto1>, <texto2>',
  example: 'Trabalhar, Ganhar dinheiro no tiktok',
  permissoes: {
    membro: [],
    bot: ['ATTACH_FILES', 'Anexar arquivos']
  },
  args: true,

  async run (client, message, args) {
    if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return

    const split = args.join(' ').split(',')
    const text1 = split[0]
    const text2 = split[1]
    if (!text1 || !text2) return
    const Image = `https://api.popcatdev.repl.co/pooh?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`
    const poo = new Discord.MessageAttachment(Image, 'tuxedopooh.png')
    message.reply({ files: [poo] })
  }
}
