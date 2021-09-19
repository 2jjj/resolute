const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
  name: 'slowmode',
  aliases: ['slow'],
  cooldown: 1000 * 2,
  description: 'Colocar modo lento no chat.',
  category: 'mod',
  usage: '<tempo> [motivo]',
  example: '5000 tem gente spamando.',
  args: true,
  permissoes: {
    membro: ['MANAGE_CHANNELS', 'Gerenciar Canais'],
    bot: ['MANAGE_CHANNELS', 'Gerenciar Canais']
  },

  async run (client, message, args) {
    if (!args[0]) return
    if (!message.member.permissions.has(module.exports.permissoes.membro[0])) return
    if (!message.guild.me.permissions.has(module.exports.permissoes.bot[0])) return

    const currentCooldown = message.channel.rateLimitPerUser
    const reason = args[1] ? args.slice(1).join(' ') : 'Sem motivos.'

    const embed = new MessageEmbed()
      .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    if (args[0] === 'off') {
      if (currentCooldown === 0) return message.channel.send(`<:outline_check_circle_black_24dp:884962192502423582> **|** O slowmode foi desativado com sucesso por ${message.author}`)

      embed.setTitle('Slowmode Desativado.')
        .setColor('#00ff00')
      return message.channel.setRateLimitPerUser(0, reason)
    }

    const time = ms(args[0]) / 1000

    if (isNaN(time)) {
      return message.channel.send('<:outline_clear_black_24dp:884962739007672390> **|** O tempo que você colocou é inválido!').then(m => m.delete({
        timeout: 5000
      }))
    }

    if (time >= 21600) {
      return message.channel.send('<:outline_clear_black_24dp:884962739007672390> **|** Esse limite de modo lento é muito alto, digite qualquer coisa menor que 6 horas.').then(m => m.delete({
        timeout: 5000
      }))
    }

    if (currentCooldown === time) return message.channel.send(`O Slowmode já está definido para ${args[0]}`)

    embed.setTitle('Slowmode Ativado com sucesso!')
      .addField('Slowmode: ', args[0])
      .addField('Ativado por: ', ` ${message.author}`)
      .addField('Razão: ', reason)
      .setColor('RANDOM')
    message.channel.setRateLimitPerUser(time, reason).then(m => m.send({ embeds: [embed] }))
  }
}
