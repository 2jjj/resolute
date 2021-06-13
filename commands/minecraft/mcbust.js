const Discord = require("discord.js")

module.exports = {
    name: "mcbust",
    description: "Comando para pegar o Bust de uma Skin de Minecraft.",
    aliases: [],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",


  async run({ message, args }, t) {

    const EMBED = new Discord.MessageEmbed()
      .setTitle(`Nick: ${args[0]}`)
      .setImage(`https://minotar.net/bust/${args[0]}/200.png`);

    message.channel.send(EMBED);
  }
};