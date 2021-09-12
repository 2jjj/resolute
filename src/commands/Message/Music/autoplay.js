const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'autoplay',
  aliases: ['ap'],
  category: 'Music',
  description: 'Ativar o autoplay na música.',
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

    const emojireplay = message.client.emoji.autoplay

    if (autoplay === false) {
      const identifier = player.queue.current.identifier
      player.set('autoplay', true)
      player.set('requester', message.author)
      player.set('identifier', identifier)
      const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`
      res = await player.search(search, message.author)
      player.queue.add(res.tracks[1])
      const thing = new MessageEmbed()
        .setColor(message.client.embedColor)
        .setTimestamp()
        .setDescription(`${emojireplay} Autoplay está **habilitado**`)
      return message.reply({ embeds: [thing] })
    } else {
      player.set('autoplay', false)
      player.queue.clear()
      const thing = new MessageEmbed()
        .setColor(message.client.embedColor)
        .setTimestamp()
        .setDescription(`${emojireplay} Autoplay está **desabilitado**`)

      return message.reply({ embeds: [thing] })
    }
  }
}
