const Discord = require('discord.js')

module.exports = {
  name: 'mchelm',
  description: 'Comando para pegar o Helm de uma Skin de Minecraft.',
  aliases: ['helm'],
  cooldown: 1000 * 2,
  category: 'misc',
  usage: '<nickname>',
  example: 'spraythebest',
  permissoes: [],
  args: true,

  run: async (client, message, args) => {
    if (!args[0]) return

    const embed = new Discord.MessageEmbed()
      .setTitle(`Helm de: ${args[0]}`)
      .setImage(`https://minotar.net/helm/${args[0]}/200.png`)
      .setColor('RANDOM')
      .setTimestamp()
    await message.reply({ embeds: [embed] })
  }
}
