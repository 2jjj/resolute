const { MessageEmbed } = require('discord.js')
const { convertTime } = require('../../../util/convert')

module.exports = {
  name: 'play',
  category: 'Music',
  aliases: ['p', 'tocar', 'plays'],
  description: 'Faça eu tocar uma música do Youtube, Soundcloud e Spotify!',
  args: true,
  usage: '<SoundCloud URL | Nome | Spotify URL>',
  example: 'Bobby Vinton Mr Lonely',
  permissoes: [],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,

  async run (client, message, args, prefix) {
    if (!args[0]) return

    const { channel } = message.member.voice
    var player = message.client.manager.get(message.guild.id)

    if (player && message.member.voice.channel !== message.guild.me.voice.channel) {
      const thing = new MessageEmbed()
        .setColor('RED')
        .setDescription('Você precisa estar no mesmo canal que eu!')
      message.reply({ embeds: [thing] })
    } else if (!player) {
      var player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        volume: 50,
        selfDeafen: true
      })
    }

    if (player.state !== 'CONNECTED') player.connect()

    player.set('autoplay', false)

    const emojiaddsong = message.client.emoji.addsong
    const emojiplaylist = message.client.emoji.playlist

    const search = args.join(' ')
    let res

    try {
      res = await player.search(search, message.author)
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy()
        throw res.exception
      }
    } catch (err) {
      return message.reply(`Ocorreu um erro ao buscar por: ${err.message}`)
    }

    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy()
        return message.reply('Não foi encontrado nenhum resultado.')
      case 'TRACK_LOADED':
        var track = res.tracks[0]
        player.queue.add(track)
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play()
        } else {
          var thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setThumbnail(track.displayThumbnail('hqdefault'))
            .setDescription(`${emojiaddsong} **Música adicionada na fila.**\n[${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\``)
          return message.reply({ embeds: [thing] })
        }
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks)
        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play()
        var thing = new MessageEmbed()
          .setColor(client.embedColor)
          .setTimestamp()
          .setDescription(`${emojiplaylist} **Playlist adicionada na fila.**\n${res.tracks.length} Songs **${res.playlist.name}** - \`[${convertTime(res.playlist.duration)}]\``)
        return message.reply({ embeds: [thing] })
      case 'SEARCH_RESULT':
        var track = res.tracks[0]
        player.queue.add(track)
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play()
        } else {
          var thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setThumbnail(track.displayThumbnail('hqdefault'))
            .setDescription(`${emojiaddsong} **Adicionado a música na fila.**\n[${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\`[<@${track.requester.id}>]`)
          return message.reply({ embeds: [thing] })
        }
    }
  }
}
