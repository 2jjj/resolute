const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "247",
  aliases: ["24h", "24/7", "24*7"],
  category: "Music",
  description: "24/7 in voice channel",
  args: false,
  usage: "",
  example: "",
  permissoes: [],
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  async run(client, message, args, prefix) {

    const player = message.client.manager.players.get(message.guild.id);
    if (player.twentyFourSeven) {
      player.twentyFourSeven = false;
      const embed = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`24/7 agora está desabilitado.`)
      return message.reply({embeds: [embed]});
    }
    else {
      player.twentyFourSeven = true;
      const embed = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`24/7 agora está habilitado.`)
      
      return message.reply({embeds: [embed]});
    }
  }
};
