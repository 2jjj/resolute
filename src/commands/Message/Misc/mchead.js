const Discord = require("discord.js")

module.exports = {
  name: "mchead",
  description: "Comando para pegar o Head de uma Skin de Minecraft.",
  aliases: ['head'],
  cooldown: 1000 * 2,
	category: "misc",
  usage: "<nickname>",
  example: "spraythebest",
  permissoes: [],
  args: true,

  run: async (client, message, args) => {

    if (!args[0]) return;

    const embed = new Discord.MessageEmbed()
      .setTitle(`Cabeça de: ${args[0]}`)
      .setImage(`https://mc-heads.net/head/${args[0]}/200`)
      .setColor("RANDOM")
      .setTimestamp()
    await message.reply({ embeds: [embed] });
  }
};