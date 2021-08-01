const {
  MessageEmbed
} = require(`discord.js`)
const config = require(`../../config/config.json`)
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `forward`,
  category: `🎶 Music`,
  aliases: [`seekforwards`, `fwd`],
  description: `Seeks a specific amount of Seconds forwards`,
  usage: `forward <Duration in Seconds>`,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {

      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | You may forward for \`1\` - \`${player.queue.current.duration}\``)
        );

      let seektime = Number(player.position) + Number(args[0]) * 1000;

      if (Number(args[0]) <= 0) seektime = Number(player.position);

      if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000;

      player.seek(Number(seektime));

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.forward} Forwarded the Song `)
        .setDescription(`Forwarded for \`${args[0]} Seconds\` to: ${format(Number(player.position))}`)
        .addField(`${emoji.msg.time} Progress: `, createBar(player))
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