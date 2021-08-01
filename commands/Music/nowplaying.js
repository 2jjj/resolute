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
  name: `nowplaying`,
  category: `🎶 Music`,
  aliases: [`np`, `current`],
  description: `Shows information about the current Song`,
  usage: `nowplaying`,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {

      if (!player.queue.current)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
        );

      return message.channel.send(new MessageEmbed()
        .setAuthor(`Current song playing:`, message.author.displayAvatarURL({
          dynamic: true
        }))
        .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
        .setURL(player.queue.current.uri)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${player.playing ? `${emoji.msg.resume}` : `${emoji.msg.pause}`} **${player.queue.current.title}**`)
        .addField(`${emoji.msg.time} Duration: `, `\`${format(player.queue.current.duration)}\``, true)
        .addField(`${emoji.msg.song_by} Song By: `, `\`${player.queue.current.author}\``, true)
        .addField(`${emoji.msg.repeat_mode} Queue length: `, `\`${player.queue.length} Songs\``, true)
        .addField(`${emoji.msg.time} Progress: `, createBar(player))
        .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
          dynamic: true
        }))
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