const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  autoplay
} = require(`../../handlers/functions`);
module.exports = {
  name: `forceskip`,
  category: `🎶 Music`,
  aliases: [`fs`],
  description: `Forces to skip the current song`,
  usage: `forceskip`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      
      if (player.queue.size == 0) {
        
        if (player.get(`autoplay`)) return autoplay(client, player, `skip`);
        
        player.destroy();
        
        return message.channel.send(new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      }
      
      player.stop();

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.skip_track} Skipped to the next Song`)
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