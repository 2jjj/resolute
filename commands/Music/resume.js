const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `resume`,
  category: `🎶 Music`,
  aliases: [`r`],
  description: `Resumes the Current paused Song`,
  usage: `resume`,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {

      if (player.playing)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | The song is already resumed!`)
          .setDescription(`You can pause it with: \`${prefix}pause\``)
        );

      player.pause(false);

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${player.playing ? `${emoji.msg.resume} Resumed` : `${emoji.msg.pause} Paused`} the Player.`)
        .addField(`${emoji.msg.time} Progress: `, createBar(player))
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
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