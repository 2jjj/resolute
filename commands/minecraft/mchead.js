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
      
    /*
    if (!nick)
      return message.channel.send(
        `${message.author}, você deve inserir um nick de uma skin de minecraft.`
      );
    */

    const EMBED = new Discord.MessageEmbed()
      .setTitle(`Nick: ${args[0]}`)
      .setImage(`https://mc-heads.net/head/${args[0]}/200`);

    await message.channel.send(EMBED);
  }
};