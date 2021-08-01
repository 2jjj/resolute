const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `playskip`,
  category: `🎶 Music`,
  aliases: [`ps`],
  description: `Plays a song instantly from youtube, which means skips current track and plays next song`,
  usage: `playskip <Song / URL>`,
  parameters: { "type": "music", "activeplayer": false, "previoussong": false },
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {

      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | You need to give me a URL or a Search term.`)
        );
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Searching** 🔎 & **Skipping** ${emoji.msg.skip_track}`)
        .setDescription(`\`\`\`${text}\`\`\``)
      ).then(msg => {
        msg.delete({ timeout: 5000 }).catch(e => console.log("Could not delete, this prevents a bug"))
      })

      playermanager(client, message, args, `skiptrack:youtube`);
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