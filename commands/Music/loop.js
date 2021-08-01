const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
module.exports = {
  name: `loop`,
  category: `🎶 Music`,
  aliases: [`repeat`, `l`],
  description: `Repeats the current song`,
  usage: `loopsong`,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {

      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please add your method!`)
          .setDescription(`\`loop song\` / \`loop queue\``)
        );

      if (args[0].toLowerCase() === `song` || args[0].toLowerCase() === `track` || args[0].toLowerCase() === `s` || args[0].toLowerCase() === `t`) {

        let embed = new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.repeat_mode} Changed Track loop to: ${player.trackRepeat ? `${emoji.msg.disabled} disabled` : `${emoji.msg.enabled} active`}`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)

        if (player.queueRepeat) {
          embed.setDescription(`And **Queue** Repeat got **${emoji.msg.disabled} disabled**`);
          player.setQueueRepeat(false);
        }

        player.setTrackRepeat(!player.trackRepeat);

        return message.channel.send(embed)
      }

      else if (args[0].toLowerCase() === `queue` || args[0].toLowerCase() === `qu` || args[0].toLowerCase() === `q`) {

        let embed = new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.repeat_mode} Changed Queue loop to: ${player.queueRepeat ? `${emoji.msg.disabled} disabled` : `${emoji.msg.enabled} active`}`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)

        if (player.trackRepeat) {
          embed.setDescription(`And **Song** Repeat got **${emoji.msg.disabled} disabled**`);
          player.setTrackRepeat(false);
        }

        player.setQueueRepeat(!player.queueRepeat);

        return message.channel.send(embed);
      }

      else {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please add your method!`)
          .setDescription(`\`loop song\` / \`loop queue\``)
        );
      }
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