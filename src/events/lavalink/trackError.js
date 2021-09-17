const { MessageEmbed } = require('discord.js')

module.exports = async (client, player, track, payload) => {
  console.error(payload.error)

  const channel = client.channels.cache.get(player.textChannel)
  const thing = new MessageEmbed()
    .setColor('RED')
    .setDescription('❌ Erro ao carregar a faixa! :/\n Chame por Spray#7725 ou entre no meu [servidor de suporte](https://discord.gg/GRhdTpsTGE)')
  channel.send({ embeds: [thing] })
  if (!player.voiceChannel) player.destroy()
}
