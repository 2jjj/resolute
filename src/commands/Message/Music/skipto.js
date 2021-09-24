const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'skipto',
  aliases: ['jump'],
  category: 'Music',
  description: 'Avance a música',
  args: true,
  usage: '<número da música na fila>',
  example: '2',
  permissoes: [],
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  async run (client, message, args, prefix) {
    if (!args[0]) return

    const player = message.client.manager.get(message.guild.id)

    if (!player) {
      const thing = new MessageEmbed()
        .setColor('RED')
        .setDescription('Não há nenhuma música tocando atualmente!')
      return message.reply({ embeds: [thing] })
    }

    const position = Number(args[0])

    if (!position || position < 0 || position > player.queue.size) {
      const thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Forma de uso: ${message.client.prefix}skipto <número da música na fila>`)
      return message.reply({ embeds: [thing] })
    }

    player.queue.remove(0, position - 1)
    player.stop()

    const emojijump = message.client.emoji.jump

    const thing = new MessageEmbed()
      .setDescription(`${emojijump} Avancei **${position}** músicas`)
      .setColor(message.client.embedColor)
      .setTimestamp()

    return message.reply({ embeds: [thing] })
  }
}
