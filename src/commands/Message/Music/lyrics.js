const { ksoftapi } = require('../../../config/config.json')
const { MessageEmbed } = require('discord.js')
const palette = require('image-palette')
const pixels = require('image-pixels')
const { KSoftClient } = require('@ksoft/api')
const ksoft = ksoftapi ? new KSoftClient(ksoftapi) : null
const lyricsFinder = require('lyrics-finder')

module.exports = {
  name: "lyrics",
  aliases: ['ly'],
  category: 'Music',
  description: 'Obter a letra de uma música!',
  args: false,
  usage: '',
  example: '',
  permissoes: [],
  async run (client, message, args, prefix) {
	  
      const player = message.client.manager.get(message.guild.id)
      if (!player) {
        const thing = new MessageEmbed()
          .setColor('RED')
          .setDescription('Não tem nenhuma música tocando atualmente nesse servidor!')
        return message.reply({ embeds: [thing] })
      }
      console.log(player)
      let lyrics = null;

      try {
        lyrics = await lyricsFinder(player.queue.title, "");
        if (!lyrics) lyrics = `Não encontrei letras para ${player.queue.current.title}`;
      } catch (error) {
        lyrics = `Não encontrei letras para ${player.queue.current.title} :(`;
      }
  
      let lyricsEmbed = new MessageEmbed()
        .setTitle(`Letras de **__${player.queue.current.title}__**`)
        .setDescription(lyrics)
        .setColor("GREEN")
        .setTimestamp();
  
      if (lyricsEmbed.description.length >= 2048)
        lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
      return message.reply({ embeds: [lyricsEmbed] }).catch(console.error);
      }
    }