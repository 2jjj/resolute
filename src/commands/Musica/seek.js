const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);

module.exports = {
  name: `avancar`,
  category: `🎶 Music`,
  aliases: [`vol`, `seek`],
  description: `Muda a posição (busca) da música`,
  usage: `seek <Duration in Seconds>`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Erro | Você pode avançar de  \`0\` para \`${player.queue.current.duration}\``)
        );

      player.seek(Number(args[0]) * 1000);

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Successo | Avançei o som para: ${format(Number(args[0]) * 1000)}`)
        .addField(`${emoji.msg.time} Progress: `, createBar(player))
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Erro | Ocorreu um erro!`)
        .setDescription(`\`\`\`Ocorreu um erro. Por favor tente novamente mais tarde\`\`\``)
      );
    }
  }
};