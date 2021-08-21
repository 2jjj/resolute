const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);

module.exports = {
  name: `pause`,
  category: `🎶 Music`,
  aliases: [`break`, `pausar`],
  description: `Pausar a música atual`,
  usage: `pause`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    
    try {
      if (!player.playing)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Erro | A música já está pausada!`)
          .setDescription(`Você pode retomar a música com: \`${prefix}resume\``)
        );

      player.pause(true);

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Successo | ${player.playing ? `${emoji.msg.resume} Retomei` : `${emoji.msg.pause} Pausei`} o player.`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .addField(`${emoji.msg.time} Progresso: `, createBar(player))
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Erro | Ocorreu um erro!`)
        .setDescription(`\`\`\`Ocorreu um erro. Por favor tente novamente mais tarde\`\`\``)
      );
    }
  }
};