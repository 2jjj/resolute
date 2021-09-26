const { ksoftapi } = require('../../../config/config.json')
const { MessageEmbed } = require('discord.js')
const palette = require('image-palette')
const pixels = require('image-pixels')
const { KSoftClient } = require('@ksoft/api')
const ksoft = ksoftapi ? new KSoftClient(ksoftapi) : null
const lyricsFinder = require('lyrics-finder')

module.exports = {
  //name: "lyrics",
  aliases: ['ly'],
  category: 'Music',
  description: 'Obter a letra de uma música!',
  args: false,
  usage: '',
  example: '',
  permissoes: [],
  async run (client, message, args, prefix) {
	  try {
      const player = message.client.manager.get(message.guild.id)
      if (!args[0] && !player) return message.channel.send({ embeds: [new MessageEmbed().setDescription('Especifique um título')] })
      const songTitle = args.join(' ') ? args.join(' ') : player.queue.current.title
      if (!songTitle) return message.channel.send({ embeds: [new MessageEmbed().setDescription('Não tem nenhuma música tocando atualmente, especifique o titulo.')] })

      const wait = await message.channel.send({ embeds: [new MessageEmbed().setDescription('Procurando...')] })
      let err
      const lyrics = await lyricsFinder(songTitl).catch(x => {
        if (!wait.deleted) { wait.delete() };
        err = 'yes'
        return message.channel.send({ embeds: [new MessageEmbed().setDescription('Nenhum resultado foi encontrado')] })
      })
      if (err == 'yes') return
      const chunked = this.chunkString(lyrics.lyrics, 1600)
      let { ids, colors } = palette(await pixels(lyrics.artwork).catch(() => { }))
      if (colors.length == 0) {
        colors = [
          '#F5F5F5',
          '#F5F5F5'
        ]
      }

      if (!wait.deleted) { wait.delete() }
      const embeds = []
      chunked.forEach((x, i) => {
        const embed = new MessageEmbed()
          .setTitle(lyrics.name ? lyrics.name : 'Unknown')
          .setDescription(`${lyrics.artist ? lyrics.artist.name : ''}\n\n\n${x}`)
          .setThumbnail(lyrics.artwork)
          .setColor(colors[i])
          .setFooter('Powered by KSoft.Si', lyrics.artwork)
        embeds.push(embed)
      })

      if (embeds.length <= 1) {
        embeds.forEach(x => message.channel.send({ embeds: [x] }))
      } else {
        let currentPage = 0
        const msg = await message.channel.send(embeds[currentPage])
        await msg.react('◀').catch((_) => { })
        await msg.react('🇽').catch((_) => { })
        await msg.react('▶').catch((_) => { })
        const filter = (reaction, user) =>
          ['◀', '🇽', '▶'].includes(reaction.emoji.name) && message.author.id === user.id
        const collector = msg.createReactionCollector(filter, { time: 890000 })
        collector.on('collect', async (reaction, user) => {
          try {
            if (reaction.emoji.name === '▶') {
              if (currentPage < embeds.length - 1) {
                currentPage++
                msg.edit(embeds[currentPage])
              }
            } else if (reaction.emoji.name === '◀') {
              if (currentPage !== 0) {
                --currentPage
                msg.edit(embeds[currentPage])
              }
            } else {
              collector.stop()
              msg.delete()
            }
            await reaction.users.remove(message.author.id).catch((_) => { })
          } catch (err) { }
        })
      }
    } catch (err) {
      const player = message.client.manager.get(message.guild.id)
      const songTitle = args.join(' ') ? args.join(' ') : player.queue.current.title

      const lyrics = await lyricsFinder(songTitle)
      const chunked = this.chunkString(lyrics.lyrics, 1600)
      const embeds = []
      chunked.forEach((x, i) => {
        const embed = new MessageEmbed()
          .setTitle(lyrics.name ? lyrics.name : 'Unknown')
          .setDescription(`${lyrics.artist ? lyrics.artist.name : ''}\n\n\n${x}`)
          .setThumbnail(lyrics.artwork)
          .setColor('#0077be')
          .setFooter('Powered by KSoft.Si', lyrics.artwork)
        embeds.push(embed)
      })

      if (embeds.length <= 1) {
        embeds.forEach(x => message.channel.send({ embeds: [x] }))
      } else {
        let currentPage = 0
        const msg = await message.channel.send(embeds[currentPage])
        await msg.react('◀').catch((_) => { })
        await msg.react('🇽').catch((_) => { })
        await msg.react('▶').catch((_) => { })
        const filter = (reaction, user) =>
          ['◀', '🇽', '▶'].includes(reaction.emoji.name) && message.author.id === user.id
        const collector = msg.createReactionCollector(filter, { time: 890000 })
        collector.on('collect', async (reaction, user) => {
          try {
            if (reaction.emoji.name === '▶') {
              if (currentPage < embeds.length - 1) {
                currentPage++
                msg.edit(embeds[currentPage])
              }
            } else if (reaction.emoji.name === '◀') {
              if (currentPage !== 0) {
                --currentPage
                msg.edit(embeds[currentPage])
              }
            } else {
              collector.stop()
              queueEmbed.delete()
            }
            await reaction.users.remove(message.author.id).catch((_) => { })
          } catch (err) { }
        })
      }
    }
  },
  chunkString (str, size) {
    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size)
    }
    return chunks
  }
}