const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'pause',
  category: 'Music',
  description: 'Pausar a música atual',
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

    const emojipause = message.client.emoji.pause

    if (player.paused) {
      const thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${emojipause} O player já está pausado.`)
        .setTimestamp()
      return message.reply({ embeds: [thing] })
    }

    player.pause(true)

    const song = player.queue.current

    const thing = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setTimestamp()
      .setDescription(`${emojipause} **Pausei o player\nPara despausar use \`${prefix}resume\`**\n[${song.title}](${song.uri})`)
    return message.reply({ embeds: [thing] })
  }
}
