const Discord = require("discord.js")

module.exports = {
    name: "mcbust",
    description: "Comando para pegar o Bust de uma Skin de Minecraft.",
    aliases: [],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",
    example: "TheSpr4y",

    run: async(client, message, args) => { 
  
    if(!args[0]) return;

    const EMBED = new Discord.MessageEmbed()
      .setTitle(`Nick: ${args[0]}`)
      .setImage(`https://minotar.net/bust/${args[0]}/200.png`);

    await message.channel.send(EMBED);
  }
};