const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
module.exports = {
  name: `removevoteskip`,
  category: `🎶 Music`,
  aliases: [`rvs`, `removeskip`, `removevs`, `votestop`, `stopvote`],
  description: `Removes your Vote of the VoteSkip!`,
  usage: `removevoteskip`,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {

      if (client.settings.get(message.guild.id, `djroles`).toString() !== ``) {
        let channelmembersize = channel.members.size;
        let voteamount = 0;
        if (channelmembersize <= 3) voteamount = 1;

        voteamount = Math.ceil(channelmembersize / 3);

        if (player.get(`vote-${message.author.id}`)) {
          player.set(`vote-${message.author.id}`, false)
          player.set(`votes`, String(Number(player.get(`votes`)) - 1));
          return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.SUCCESS} Success | Removed your Vote!`)
            .setDescription(`There are now: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        } else {
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | You havn't voted yet!!`)
            .setDescription(`There are: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        }
      } else
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} ERROR | Cannot remove your Vote!`)
          .setDescription(`Because ther is no DJ-Role Setup created yet, create it by typing \`${prefix}adddj @DJ-Setup\``)
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