const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
module.exports = {
  name: `prefix`,
  aliases: [`prefix`],
  category: `⚙️ Settings`,
  description: `Let's you change the Prefix of the BOT`,
  usage: `prefix <NEW PREFIX>`,
  memberpermissions: [`ADMINISTRATOR`],
  run: async (client, message, args) => {
    try {
      
      let prefix = client.settings.get(message.guild.id, `prefix`);
      
      if (prefix === null) prefix = config.prefix;
      
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please provide a new prefix!`)
          .setDescription(`Current prefix: \`${prefix}\``)
        );
        
      if (args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | The prefix can\'t have two spaces`)
        );
        
      if (args[0].length > 5)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | The prefix can\'t be Longer then \`5\``)
        );
        
      client.settings.set(message.guild.id, args[0], `prefix`);
      
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | Set new prefix to **\`${args[0]}\`**`)
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