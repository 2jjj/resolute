const db = require('quick.db')
const emoji = require('../../../config/emojis.json')

module.exports = {
  name: 'aboutme',
  aliases: ['sobremim'],
  cooldown: 1000 * 2,
  description: 'Troque o seu sobremim!',
  category: 'economia',
  usage: '<texto>',
  example: 'Ola!',
  permissoes: [],
  args: true,

  async run (client, message, args, prefix) {
    const user = message.member
    if (!args[0]) return

    db.set(`sobre_mim_${user.id}`, `${args[0]}`)
    message.reply(` <:outline_check_circle_black_24dp:884962192502423582> **»** Sucesso! a sua mensagem foi alterada.`)
  }
}
