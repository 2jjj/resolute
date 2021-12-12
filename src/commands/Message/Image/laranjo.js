const jimp = require('jimp')
const cooldowns = {}
const ms = require('ms')
const Discord = require("discord.js")

module.exports = {
  name: 'laranjo',
  aliases: ['laranjomeme'],
  cooldown: 1000 * 2,
  description: 'Faça o laranjo dizer algo!',
  category: 'manipulacao',
  usage: '<texto>',
  example: 'ola amigos!',
  permissoes: {
    membro: [],
    bot: ['ATTACH_FILES', 'Anexar arquivos']
  },
  args: true,

  async run (client, message, args) {
    if (!message.guild.me.permissions.has(`${Discord.Permissions}.FLAGS.${module.exports.permissoes[0]}`)) return
    if (!args[0]) return

    if (!cooldowns[message.author.id]) {
      cooldowns[message.author.id] = {
        lastCmd: null
      }
    }

    const ultimoCmd = cooldowns[message.author.id].lastCmd
    const timeout = 15000
    if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
      const time = ms(timeout - (Date.now() - ultimoCmd))
      let resta = [time.seconds, 'segundos']

      if (resta[0] == 0) resta = ['alguns', 'millisegundos']
      if (resta[0] == 1) resta = [time.seconds, 'segundo']
      message.reply(`**Espere **\`${time}\`** para executar outro comando**`)
      return
    } else {
      cooldowns[message.author.id].lastCmd = Date.now()
    }

    const img = jimp.read('https://cdn.discordapp.com/attachments/554048737648050179/610011657632219147/laranjo-meme-cke.jpg')
    img.then(image => {
      jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
        image.resize(685, 494)
        image.print(font, 20, 30, args.join(' '), 600)
        image.getBuffer(jimp.MIME_PNG, (err, i) => {
          message.reply({
            files: [{
              attachment: i,
              name: 'laranjo.png'
            }]
          })
        })
      })
    })
  }
}
