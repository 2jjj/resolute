const Discord = require('discord.js')

module.exports = {
  name: 'mcbust',
  description: 'Comando para pegar o Bust de uma Skin de Minecraft.',
  aliases: ['bust'],
  cooldown: 1000 * 2,
  category: 'misc',
  usage: '<nickname>',
  example: 'spraythebest',
  permissoes: [],
  args: true,

  run: async (client, message, args) => {
    if (!args[0]) return

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bust de: ${args[0]}`)
      .setImage(`https://minotar.net/bust/${args[0]}/200.png`)
      .setColor('RANDOM')
      .setTimestamp()
    message.reply({ embeds: [embed] })
  }
}
