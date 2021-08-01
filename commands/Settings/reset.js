const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
module.exports = {
  name: `reset`,
  aliases: [`hardreset`],
  category: `⚙️ Settings`,
  description: `Resets / Deletes all of the Setups as well as the prefix!`,
  usage: `reset`,
  memberpermissions: [`ADMINISTRATOR`],
  run: async (client, message, args) => {
    try {
      
      if (message.member.guild.owner.id !== message.author.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | You don\'t have permission for this Command! *Only the Server-Owner*`)
        );
        
      let themsg = message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`Do you really want to reset all SETTINGS?`)
        .setDescription(`*Reply with:* **__\`yes\`__**`)
      ).then((msg) => {
        
        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
          max: 1,
          time: 30 * 1000,
          errors: ['time']
        })
          .then(async collected => {

            if (collected.first().content.toLowerCase() === `yes`) {

              client.setups.set(message.guild.id, {
                textchannel: `0`,
                voicechannel: `0`,
                category: `0`,
                message_cmd_info: `0`,
                message_queue_info: `0`,
                message_track_info: `0`
              });

              client.settings.set(message.guild.id, {
                prefix: config.prefix,
                djroles: [],
                botchannel: [],
              });

              return message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.SUCCESS} Success | Resetted everything!`)
                .setDescription(`Prefix is now again: \`${config.prefix}\`\nNo more DJ ROLES, No more Setup, No more Bot Channels`)
              );
            }

          }).catch(e => {
            console.log(String(e.stack).yellow)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | CANCELLED CAUSE NOT THE RIGHT WORD / TIME RAN OUT!`)
            );
          })
      });
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