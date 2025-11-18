const Discord = require('discord.js')

module.exports = {
  name: 'avatar',
  aliases: ['av', 'icon'],
  cooldown: 1000 * 2,
  description: 'Pegue um avatar de alguém!',
  category: 'misc',
  usage: '<@user>',
  example: '@Spray#7725',
  permissoes: [],
  args: false,

  async run (client, message, args) {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
    const avatar = user.avatarURL({
      dynamic: true,
      format: 'png',
      size: 1024
    })

    const embed = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setTitle(`:frame_photo: Avatar de ${user.username}`)
      .setDescription(`Clique [aqui](${avatar}) para baixar a imagem!`)
      .setImage(avatar)
      .setFooter(`» Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({
        format: 'png'
      }))
    await message.reply({ embeds: [embed] })
  }
}
