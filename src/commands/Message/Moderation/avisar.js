const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'avisar',
  aliases: ['warn', 'aviso'],
  cooldown: 1000 * 2,
  description: 'Avisar uma pessoa com aviso na dm e acrescentar warns no warnlist(ps: quando o usuário receber 3 warns ele será banido.)',
  category: 'mod',
  usage: '@user <motivo>',
  example: '@Spray#7725 Ofensa a staff',
  args: true,
  permissoes: {
    membro: ['ADMINISTRATOR', 'Administrador'],
    bot: ['ADMINISTRATOR', 'Administrador']
  },

  async run (client, message, args) {
    if (!args[0]) return;
    if (!message.member.permissions.has(module.exports.permissoes.membro[0])) return;
    if (!message.guild.me.permissions.has(module.exports.permissoes.bot[0])) return;

    const membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase())
    const warns = await db.get(`warnsCount_${message.guild.id}-${membro.id}`) || 0

    if (!message.member.roles.highest > membro.roles.highest) {
      return message.reply({ content: '<:outline_clear_black_24dp:884962739007672390> **|** Você não pode dar warn nesse usuário, pois o cargo dele é superior ao meu ou seu!' })
    }

    const list = [
      'https://imgur.com/ZNuAcum.gif',
      'https://imgur.com/xlD7P3N.gif',
      'https://imgur.com/cT6TUwv.gif',
      'https://imgur.com/7l7n5un.gif',
      'https://imgur.com/NYZsPRx.gif',
      'https://imgur.com/gVAiCX6.gif',
      'https://imgur.com/usOD4UR.gif',
      'https://imgur.com/4uDadjQ.gif'
    ]

    const rand = list[Math.floor(Math.random() * list.length)]
    const motivo = args.slice(1).join(' ')

    const embed1 = new Discord.MessageEmbed()
      .setTitle('Resolute')
      .setColor('RANDOM')
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
      .addField('Usuário avisado:', `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> ${membro} | \`${membro.id}\``)
      .addField('Autor:', `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> ${message.author} | \`${message.author.id}\``)
      .addField('Motivo:', `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> \`${motivo.length !== 0 ? `${motivo}` : 'Sem motivos para o banimento.'}\``)
      .setFooter('Resolute - Punições', message.author.displayAvatarURL())
      .setImage(rand)
      .setTimestamp()

    const embed = new Discord.MessageEmbed() // ${membro.username}
      .setTitle('Você foi avisado!')
      .setColor('RANDOM')
      .setFooter(`Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
      .setImage(rand)
      .setDescription(`<:outline_arrow_right_alt_black_24:884959628973178910> \`${motivo.length !== 0 ? `${motivo}` : 'Sem motivos para o warn.'}\``)
    // membro.send({ embeds: [embed] })
    message.channel.send({ embeds: [embed1] })
    await db.add(`warnsCount_${message.guild.id}-${membro.id}`, 1)

    if (warns >= 3) {
      const embed_adv = new Discord.MessageEmbed()
        .setTitle('Resolute')
        .setColor('RANDOM')
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`<:outline_arrow_right_alt_black_24:884959628973178910> O usuário ${membro} foi **banido** por atingir 3 advertências!`)
        .setTimestamp()

      message.channel.send({ embeds: [embed_adv] })
      db.subtract(`warnsCount_${message.guild.id}-${membro.id}`, 3)
      membro.ban({ reason: '3 warns - autoban' })
    }
  }
}
