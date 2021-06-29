const Discord = require("discord.js")

module.exports = {
    name: "mchead",
    description: "Comando para pegar o Head de uma Skin de Minecraft.",
    aliases: [],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",
    example: "mchead TheSpr4y",

    run: async(client, message, args) => { 
      
    if(!args[0]) return console.log(0)

    const EMBED = new Discord.MessageEmbed()
      .setTitle(`Nick: ${args[0]}`)
      .setImage(`https://mc-heads.net/head/${args[0]}/200`);

    await message.channel.send(EMBED);
  }
};