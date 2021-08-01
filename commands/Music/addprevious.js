const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require("../../config/config.json");
const emoji = require(`../../config/emojis.json`);
const ee = require("../../config/embed.json");
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `addprevious`,
  category: `🎶 Music`,
  aliases: [`addp`, `addpre`, `addprevius`, `addprevios`],
  description: `Adds the previous song to the Queue again!`,
  usage: `addprevious`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": true},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      
      let type = `song:youtube`;
      
      if (player.queue.previous.uri.includes(`soundcloud`)) type = `song:soundcloud`
      
      playermanager(client, message, Array(player.queue.previous.uri), type);
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