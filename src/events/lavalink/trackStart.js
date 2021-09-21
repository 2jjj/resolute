const { MessageEmbed } = require('discord.js')
const { convertTime } = require('../../util/convert')

module.exports = async (client, player, track, payload) => {
  const channel = client.channels.cache.get(player.textChannel)
  const emojiplay = client.emoji.play
  console.log(track)
  const thing = new MessageEmbed()
    .setDescription(`${emojiplay} **Começando a tocar:**\n [${track.title}](${track.uri})\n\`Autor: ${track.author}\`\n\`Duração: ${convertTime(track.duration)}\`\n\`Requisitado por: ${track.requester.tag}\``)
    .setThumbnail(track.displayThumbnail('3'))
    .setColor(client.embedColor)
    .setTimestamp()
  return channel.send({ embeds: [thing] })
}