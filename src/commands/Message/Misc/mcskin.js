const Discord = require('discord.js')

module.exports = {
  name: 'mcskin',
  description: 'O bot vai mandar a skin de algum player de minecraft.',
  aliases: ['skin'],
  cooldown: 1000 * 2,
  category: 'misc',
  usage: '<nickname>',
  example: 'spraythebest',
  permissoes: [],
  args: true,

  run: async (client, message, args) => {
    if (!args[0]) return

    const embed = new Discord.MessageEmbed()
      .setTitle(`Skin de: ${args[0]}`)
      .setImage(`https://mc-heads.net/body/${args[0]}`)
      .setColor('RANDOM')
      .setTimestamp()
    await message.reply({ embeds: [embed] })
  }
}
