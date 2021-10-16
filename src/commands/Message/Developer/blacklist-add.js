const blacklist = require('../../../databases/Schemas/blacklist')
const Discord = require('discord.js')

module.exports = {
  name: 'blacklist-add',
  aliases: ['blacklist', 'tchau'],
  cooldown: 1000 * 2,
  description: 'Adicionar um usuário na blacklist.',
  category: 'dev',
  usage: '',
  example: '',
  permissoes: [],
  args: true,

  async run (client, message, args) {
    if (message.author.id !== '836345581424738354') return message.channel.send('Apenas desenvolvedores.')
    const motivo = args.slice(1).join(' ')
    const User = message.guild.members.cache.get(args[0])
    if (!User) return

    blacklist.findOne({ id: User.user.id }, async (err, data) => {
      if (err) throw err
      if (data) {
        message.channel.send(`**${User.displayName}** já está na blacklist!`)
      } else {
        data = new blacklist({
          id: User.user.id
        })
        data.save()
          .catch(err => console.log(err))
        const embed = new Discord.MessageEmbed()
          .setTitle('Resolute')
          .setColor('RANDOM')
          .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
          .addField('Usuário adicionado na blacklist', `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> ${User.user} | \`${User.id}\``)
          .addField('Autor:', `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> ${message.author} | \`${message.author.id}\``)
          .addField('Motivo:', `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> \`${motivo.length !== 0 ? `${motivo}` : 'Sem motivos.'}\``)
          .setFooter('Resolute - Blacklist 😎', message.author.displayAvatarURL())
          .setTimestamp()
        message.channel.send({ embeds: [embed] })
      }
    })
  }
}
