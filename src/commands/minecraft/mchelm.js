const Discord = require ("discord.js")

module.exports = {
    name: "mchelm",
    description: "Comando para pegar o Helm de uma Skin de Minecraft.",
    aliases: ['helm'],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",
    example: "TheSpr4y",
    args: true,
	
    run: async(client, message, args) => { 
    
      if(!args[0]) return;

    const EMBED = new Discord.MessageEmbed()
      .setTitle(`Nick: ${args[0]}`)
      .setImage(`https://minotar.net/helm/${args[0]}/200.png`);
    await message.channel.send(EMBED);
  }
};