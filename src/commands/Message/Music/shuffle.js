const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'shuffle',
  category: 'Music',
  description: 'Embaralhar a fila',
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
        .setDescription('Não tem nenhuma música tocando atualmente nesse servidor!')
      return message.reply({ embeds: [thing] })
    }

    player.queue.shuffle()

    const emojishuffle = message.client.emoji.shuffle

    const thing = new MessageEmbed()
      .setDescription(`${emojishuffle} Filha embaralhada.`)
      .setColor(message.client.embedColor)
      .setTimestamp()
    return message.channel.send({ embeds: [thing] }).catch(error => message.client.logger.log(error, 'error'))
  }
}
