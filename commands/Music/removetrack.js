const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
module.exports = {
  name: `removetrack`,
  category: `🎶 Music`,
  aliases: [`rt`, `remove`],
  description: `Removes a track from the Queue`,
  usage: `removetrack <Trackindex>`,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {

      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Error | Please add the Track you want to remove!`)
          .setDescription(`Example: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2}\``)
        );

      if (isNaN(args[0]))
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Error | It has to be a valid Queue Number!`)
          .setDescription(`Example: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2}\``)
        );

      if (Number(args[0]) > player.queue.size)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Error | Your Song must be in the Queue!`)
          .setDescription(`Example: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2}\``)
        );

      player.queue.remove(Number(args[0]) - 1);

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.cleared} I removed the track at position: \`${Number(args[0])}\``)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }
  }
};