const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'stop',
  category: 'Music',
  description: 'Pare a música',
  args: false,
  usage: '',
  example: '',
  permissoes: [],
  player: false,
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

    const autoplay = player.get('autoplay')
    if (autoplay === true) {
      player.set('autoplay', false)
    }

    player.stop()
    player.queue.clear()

    const emojistop = message.client.emoji.stop

    const thing = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setTimestamp()
      .setDescription(`${emojistop} Parei a música e sai de seu canal de voz!`)
    message.channel.send({ embeds: [thing] })
  	}
}
