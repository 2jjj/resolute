const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);

module.exports = {
  name: `rewind`,
  category: `🎶 Music`,
  aliases: [`seekbackwards`, `rew`],
  description: `Procura uma quantidade específica de segundos para trás`,
  usage: `rewind <Duration in Seconds>`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Erro | Você pode retornar de \`1\` a \`${player.queue.current.duration}\``)
        );
      let seektime = player.position - Number(args[0]) * 1000;
      if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
        seektime = 0;
      }

      player.seek(Number(seektime));

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Sucesso | ${emoji.msg.rewind} Retornei \`${args[0]} segundos\` para: ${format(Number(player.position))}`)
        .addField(`${emoji.msg.time} Progresso: `, createBar(player))
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