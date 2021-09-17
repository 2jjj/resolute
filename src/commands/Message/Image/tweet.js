const {
  MessageEmbed
} = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'tweet',
  aliases: [],
  description: 'Escreva um tweet',
  category: 'manipulacao',
  cooldown: 1000 * 2,
  usage: '<texto>',
  example: 'teste de texto',
  permissoes: {
    membro: [],
    bot: ['ATTACH_FILES', 'Anexar arquivos']
  },
  args: true,

  async run (client, message, args) {
    if (!message.guild.me.permissions.has(`${Discord.Permissions}.FLAGS.${module.exports.permissoes[0]}`)) return

    fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.join(' ')}`)
      .then((res) => res.json())
      .then((data) => {
        const embed = new MessageEmbed()
          .setTitle('Tweet!')
          .setImage(data.message)
          .setTimestamp()
        message.channel.send(embed)
      })
  }
}
