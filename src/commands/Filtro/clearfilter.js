const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `clearfilter`,
  category: `👀 Filter`,
  aliases: [`cf`],
  description: `Clears the Equalizer`,
  usage: ``,
  example: "",
  permissoes: [],
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      player.clearEQ();
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Successo | Resetei o equalizador!`)
        //.addField(`${emoji.msg.equalizer} Equalizer: `, `${emoji.msg.ERROR} Nothing`)
        //.setDescription(`Note: *It might take up to 5 seconds until you hear the new Equalizer*`)
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