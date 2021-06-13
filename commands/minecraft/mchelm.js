const Discord = require ("discord.js")

module.exports = {
    name: "mchelm",
    description: "Comando para pegar o Helm de uma Skin de Minecraft.",
    aliases: [],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",

    run: async(client, message, args) => { 
      
    const EMBED = new Discord.MessageEmbed()
      .setTitle(`Nick: ${args[0]}`)
      .setImage(`https://minotar.net/helm/${args[0]}/200.png`);

    message.channel.send(EMBED);
  }
};