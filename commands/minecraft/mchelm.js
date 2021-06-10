const Discord = require ("discord.js")

module.exports = {
    name: "mchelm",
    description: "Comando para pegar o Helm de uma Skin de Minecraft.",
    aliases: [],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",

    run: async(client, message, args) => { 
    const nick = args[0];

    if (!nick)
      return message.channel.send(
        `${message.author}, você deve inserir um nick de uma skin de minecraft.`
      );

    const EMBED = new Discord.MessageEmbed()

      .setTitle(`Nick: ${nick}`)
      .setImage(`https://minotar.net/helm/${nick}/200.png`);

    message.channel.send(EMBED);
  }
};