const delay = require('delay')
const { MessageEmbed } = require('discord.js')

module.exports = async (client, player, message) => {
  player.destroy()

  const channel = client.channels.cache.get(player.textChannel)
  const emojiwarn = client.emoji.warn
  const thing = new MessageEmbed()
    .setColor(client.embedColor)
    .setDescription(`${emojiwarn} **Todas as músicas foram tocadas.**`)
    .setFooter(client.user.username, client.user.displayAvatarURL())
  channel.send({ embeds: [thing] })
}
