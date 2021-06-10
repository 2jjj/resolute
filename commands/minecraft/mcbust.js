module.exports = {
    name: "mcbust",
    description: "Comando para pegar o Bust de uma Skin de Minecraft.",
    aliases: [],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",


  async run({ message, args }, t) {
    const nick = args[0];

    if (!nick)
      return message.channel.send(
        `${message.author}, você deve inserir um nick de uma skin de minecraft.`
      );

    const EMBED = new Discord.MessageEmbed()
      .setTitle(`${Emojis.Minecraft} - Nick: ${nick}`)
      .setImage(`https://minotar.net/bust/${nick}/200.png`);

    message.channel.send(EMBED);
  }
};