const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'skip',
  aliases: ['s'],
  category: 'Music',
  description: 'Pule para a próxima música da fila',
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

    const autoplay = player.get('autoplay')
    const song = player.queue.current

    if (autoplay === false) {
      player.stop()
    } else {
      player.stop()
      player.queue.clear()
      player.set('autoplay', false)
    }

    const emojiskip = message.client.emoji.skip

    const thing = new MessageEmbed()
    //\n[${song.title}](${song.uri})
      .setDescription(`${emojiskip} **A Música foi avançada para a próxima da fila!**`)
      .setColor(message.client.embedColor)
      .setTimestamp()
    return message.reply({ embeds: [thing] })
  }
}
