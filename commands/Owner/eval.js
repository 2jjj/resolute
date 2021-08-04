const {
  MessageEmbed,
  splitMessage
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  inspect
} = require(`util`);

module.exports = {
  name: `eval`,
  category: `👑 Owner`,
  aliases: [`evaluate`],
  description: `eval Command`,
  usage: `eval <CODE>`,

  run: async (client, message, args, cmduser, text, prefix) => {
    if (!config.ownerIDS.includes(message.author.id)) return;
    
    if (!args[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(client.user.username, ee.footericon)
        .setTitle(`${emoji.msg.ERROR}  Error | You have to at least include one evaluation arguments`)
      );
    let evaled;
    try {

      evaled = await eval(args.join(` `));

      let string = inspect(evaled);

      let evalEmbed = new MessageEmbed()
        .setTitle(`Tortuguita`)
        .setColor(ee.color);

      const splitDescription = splitMessage(string, {
        maxLength: 2040,
        char: `\n`,
        prepend: ``,
        append: ``
      });

      splitDescription.forEach(async (m) => {

        evalEmbed.setDescription(`\`\`\`` + m + `\`\`\``);

        message.channel.send(evalEmbed);
      });
    } catch (e) {
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};