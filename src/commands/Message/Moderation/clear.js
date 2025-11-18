module.exports = {
  name: 'clear',
  aliases: ['limpar'],
  cooldown: 1000 * 2,
  description: 'Limpar uma determinada quantidade de mensagens no chat.',
  category: 'mod',
  usage: '<1/99>',
  example: '99',
  args: true,
  permissoes: {
    membro: ['MANAGE_MESSAGES', 'Gerenciar Mensagens'],
    bot: ['MANAGE_MESSAGES', 'Gerenciar Mensagens']
  },

  async run (client, message, args) {
    if (!args[0]) return;
    if (!message.member.permissions.has(module.exports.permissoes.membro[0])) return;
    if (!message.guild.me.permissions.has(module.exports.permissoes.bot[0])) return;

    const amount = args[0]

    if (amount <= 100) {
      message.channel.bulkDelete(amount, true)
    }

    message.reply({ content: `<:outline_check_circle_black_24dp:884962192502423582> **|** O chat teve ${amount} mensagens deletadas por ${message.author}!` })
  }
}
