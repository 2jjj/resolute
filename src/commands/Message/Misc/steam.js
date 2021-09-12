const steam = require('steam-provider')
const provider = new steam.SteamProvider()
const Discord = require('discord.js')

module.exports = {
  name: 'steam',
  aliases: ['game', 'steamgame'],
  cooldown: 1000 * 2,
  description: 'Busque por informações do seu jogo favorito da steam!',
  category: 'misc',
  usage: '<jogo>',
  example: 'csgo',
  permissoes: [],
  args: true,

  async run (client, message, args) {
    if (!args[0]) return

    const arg = args.join(' ')

    provider.search(arg).then(result => {
      provider.detail(result[0].id, 1, 'portuguese', 'pt').then(results => {
        const other = results.otherData
        const embed = new Discord.MessageEmbed()
          .setTitle(results.name)
          .setColor('#2F3136')
          .setDescription(`\n
                    <:setaaa:860626769089265665> **Gênero:** \`${results.genres.join(', ')} \`
                    <:setaaa:860626769089265665> **Plataforma:** \`${other.platforms.join(', ')}\`
                    <:setaaa:860626769089265665> **Características:** \`${other.features.join(', ')}\`
                    <:setaaa:860626769089265665> **Desenvolvedor:** \`${other.developer.join(', ')}\``)
          .setThumbnail(other.imageUrl)
          .setFooter(message.author.tag, message.author.displayAvatarURL(), message.author.displayAvatarURL)
        return message.reply({ embeds: [embed] })
      })
    })
  }
}
