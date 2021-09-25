const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "filtro",
  category: 'Music',
  aliases: ['eq', 'equalizer'],
  description: 'Equalizador',
  args: true,
  usage: '<Party || Bass || Radio || Pop || Trablebass || Soft || Custom || Off>',
  example: '',
  permissoes: [],
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  async run (client, message, args, prefix) {
    if (!args[0]) return

    const player = message.client.manager.get(message.guild.id)

    if (!player.queue.current) {
      const thing = new MessageEmbed()
        .setColor('RED')
        .setDescription('Não tem nenhuma música tocando atualmente nesse servidor!')
      return message.reply({ embeds: [thing] })
    }

    const emojiequalizer = message.client.emoji.filter

    const thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setTimestamp()

    if (args[0] == 'party') {
      var bands = [
        { band: 0, gain: -1.16 },
        { band: 1, gain: 0.28 },
        { band: 2, gain: 0.42 },
        { band: 3, gain: 0.5 },
        { band: 4, gain: 0.36 },
        { band: 5, gain: 0 },
        { band: 6, gain: -0.3 },
        { band: 7, gain: -0.21 },
        { band: 8, gain: -0.21 }
      ]
      player.setEQ(...bands)
      thing.setDescription(`${emojiequalizer} O modo **Party** foi ligado.`)
    } else if (args[0] == 'bass') {
      var bands = [
        { band: 0, gain: 0.6 },
        { band: 1, gain: 0.7 },
        { band: 2, gain: 0.8 },
        { band: 3, gain: 0.55 },
        { band: 4, gain: 0.25 },
        { band: 5, gain: 0 },
        { band: 6, gain: -0.25 },
        { band: 7, gain: -0.45 },
        { band: 8, gain: -0.55 },
        { band: 9, gain: -0.7 },
        { band: 10, gain: -0.3 },
        { band: 11, gain: -0.25 },
        { band: 12, gain: 0 },
        { band: 13, gain: 0 },
        { band: 14, gain: 0 }
      ]
      player.setEQ(...bands)
      thing.setDescription(`${emojiequalizer} O modo **Bass** foi ligado.`)
    } else if (args[0] == 'radio') {
      var bands = [
        { band: 0, gain: 0.65 },
        { band: 1, gain: 0.45 },
        { band: 2, gain: -0.45 },
        { band: 3, gain: -0.65 },
        { band: 4, gain: -0.35 },
        { band: 5, gain: 0.45 },
        { band: 6, gain: 0.55 },
        { band: 7, gain: 0.6 },
        { band: 8, gain: 0.6 },
        { band: 9, gain: 0.6 },
        { band: 10, gain: 0 },
        { band: 11, gain: 0 },
        { band: 12, gain: 0 },
        { band: 13, gain: 0 },
        { band: 14, gain: 0 }
      ]
      player.setEQ(...bands)
      thing.setDescription(`${emojiequalizer} O modo **Radio** foi ligado.`)
    } else if (args[0] == 'pop') {
      var bands = [
        { band: 0, gain: -0.25 },
        { band: 1, gain: 0.48 },
        { band: 2, gain: 0.59 },
        { band: 3, gain: 0.72 },
        { band: 4, gain: 0.56 },
        { band: 5, gain: 0.15 },
        { band: 6, gain: -0.24 },
        { band: 7, gain: -0.24 },
        { band: 8, gain: -0.16 },
        { band: 9, gain: -0.16 },
        { band: 10, gain: 0 },
        { band: 11, gain: 0 },
        { band: 12, gain: 0 },
        { band: 13, gain: 0 },
        { band: 14, gain: 0 }
      ]
      player.setEQ(...bands)
      thing.setDescription(`${emojiequalizer} O modo **Pop** foi ligado.`)
    } else if (args[0] == 'trablebass') {
      var bands = [
        { band: 0, gain: 0.6 },
        { band: 1, gain: 0.67 },
        { band: 2, gain: 0.67 },
        { band: 3, gain: 0 },
        { band: 4, gain: -0.5 },
        { band: 5, gain: 0.15 },
        { band: 6, gain: -0.45 },
        { band: 7, gain: 0.23 },
        { band: 8, gain: 0.35 },
        { band: 9, gain: 0.45 },
        { band: 10, gain: 0.55 },
        { band: 11, gain: 0.6 },
        { band: 12, gain: 0.55 },
        { band: 13, gain: 0 },
        { band: 14, gain: 0 }
      ]
      player.setEQ(...bands)
      thing.setDescription(`${emojiequalizer} O modo **Trablebass** foi ligado.`)
    } else if (args[0] === 'Bassboost' || args[0] == 'bassboost') {
      var bands = new Array(7).fill(null).map((_, i) => (
        { band: i, gain: 0.25 }
      ))
      player.setEQ(...bands)
      thing.setDescription(`${emojiequalizer} O modo **Bassboost** foi ligado.`)
    } else if (args[0] == 'soft') {
      var bands = [
        { band: 0, gain: 0 },
        { band: 1, gain: 0 },
        { band: 2, gain: 0 },
        { band: 3, gain: 0 },
        { band: 4, gain: 0 },
        { band: 5, gain: 0 },
        { band: 6, gain: 0 },
        { band: 7, gain: 0 },
        { band: 8, gain: -0.25 },
        { band: 9, gain: -0.25 },
        { band: 10, gain: -0.25 },
        { band: 11, gain: -0.25 },
        { band: 12, gain: -0.25 },
        { band: 13, gain: -0.25 },
        { band: 14, gain: -0.25 }
      ]
      player.setEQ(...bands)
      thing.setDescription(`${emojiequalizer} O modo **Soft** foi ligado.`)
    } else if (args[0] == 'custom') {
      var bands = [
        { band: 0, gain: args[1] },
        { band: 1, gain: args[2] },
        { band: 2, gain: args[3] },
        { band: 3, gain: args[4] },
        { band: 4, gain: args[5] },
        { band: 5, gain: args[6] },
        { band: 6, gain: args[7] },
        { band: 7, gain: args[8] },
        { band: 8, gain: args[9] },
        { band: 9, gain: args[10] },
        { band: 10, gain: args[11] },
        { band: 11, gain: args[12] },
        { band: 12, gain: args[13] },
        { band: 13, gain: args[14] }
      ]
      player.setEQ(...bands)
      thing.setDescription(`${emojiequalizer} O modo de equalizador personalizado está ligado!`)
    } else if (args[0] === 'Off' || args[0] == 'off') {
      player.clearEQ()
      thing.setDescription(`${emojiequalizer} O modo equalizador está desligado.`)
    }
    return message.channel.send({ embeds: [thing] })
  }
}
