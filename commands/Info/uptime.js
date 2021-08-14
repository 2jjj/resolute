const {
  MessageEmbed
} = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const emoji = require(`../../config/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
module.exports = {
  name: "uptime",
  category: "info",
  aliases: [""],
  cooldown: 10,
  usage: "uptime",
  description: "Returns the duration on how long the Bot is online",
  run: async (client, message, args, user, text, prefix) => {
    try {
      message.inlineReply(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`:white_check_mark: **${client.user.username}** | ${duration(client.uptime)} online`)
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
}