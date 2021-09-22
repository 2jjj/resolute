module.exports = {
  name: 'banlist',
  aliases: ['listabans'],
  cooldown: 1000 * 2,
  description: 'Veja a lista de membros banidos em seu servidor!',
  category: 'mod',
  usage: '',
  example: '',
  args: false,
  permissoes: {
    membro: ['BAN_MEMBERS', 'Banir Membros'],
    bot: ['BAN_MEMBERS', 'Banir Membros']
  },

  async run (client, message, args) {
    if (!message.member.permissions.has(module.exports.permissoes.membro[0])) return;
    if (!message.guild.me.permissions.has(module.exports.permissoes.bot[0])) return;

    const bans = await message.guild.bans.fetch()

    if (!bans.first()) return message.reply('<:outline_clear_black_24dp:884962739007672390> **|** Este servidor não possui membros banidos!')

    let msg = ''

    bans.map(user => {
      msg += `\`${user.user.tag}\`, `
    })

    message.reply('Lista de membros banidos:\n' + msg, {
      split: true
    })
  }
}
