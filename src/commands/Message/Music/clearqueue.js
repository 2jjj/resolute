const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'clearqueue',
  aliases: ['cq'],
  category: 'Music',
  description: 'Limpar a fila de músicas',
  args: false,
  usage: '',
  example: '',
  permissoes: [],
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  async run (client, message, args, prefix) {
    const player = message.client.manager.get(message.guild.id)

    if (!player) {
      const thing = new MessageEmbed()
        .setColor('RED')
        .setDescription('Não há nenhuma música tocando atualmente!')
      return message.reply({ embeds: [thing] })
    }

    player.queue.clear()

    const emojieject = message.client.emoji.remove

    const thing = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setTimestamp()
      .setDescription(`${emojieject} Removi todos os sons da fila.`)
    return message.reply({ embeds: [thing] })
  }
}
