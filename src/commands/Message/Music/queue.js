const { MessageEmbed } = require('discord.js')
const { convertTime } = require('../../../util/convert')

module.exports = {
  name: 'queue',
  category: 'Music',
  aliases: ['q'],
  description: 'Comando para mostrar a fila de músicas',
  args: false,
  usage: '',
  example: '',
  permissoes: [],
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  async run (client, message, args, prefix) {
    const player = message.client.manager.get(message.guild.id)

    if (!player) {
      const thing = new MessageEmbed()
        .setColor('RED')
        .setDescription('Não há nenhuma música tocando atualmente!')
      return message.reply({ embeds: [thing] })
    }

    const queue = player.queue

    const emojiQueue = message.client.emoji.queue

    const embed = new MessageEmbed()
      .setColor(message.client.embedColor)

    const multiple = 10
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1

    const end = page * multiple
    const start = end - multiple

    const tracks = queue.slice(start, end)

    if (queue.current) embed.addField('Agora está tocando:', `[${queue.current.title}](${queue.current.uri}) \`[${convertTime(queue.current.duration)}]\``)

    if (!tracks.length) embed.setDescription(`Sem faixas na ${page > 1 ? `pagina ${page}` : 'fila'}.`)
    else embed.setDescription(`${emojiQueue} Lista de fila\n` + tracks.map((track, i) => `${start + ++i} - [${track.title}](${track.uri}) \`[${convertTime(track.duration)}]\``).join('\n'))

    const maxPages = Math.ceil(queue.length / multiple)

    embed.addField('\u200b', `Pagina ${page > maxPages ? maxPages : page} de ${maxPages}`)

    return message.channel.send({ embeds: [embed] })
  }
}
