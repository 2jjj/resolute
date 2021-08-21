const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `loop`,
  category: `🎶 Music`,
  aliases: [`repeat`, `l`],
  description: `Repetir o som atual`,
  usage: `loopsong`,
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
          .setFooter(ee.footertext, ee.footericon)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Por favor, adicione o métodoe em que deseja colocar o loop!`)
          .setDescription(`\`loop musica\` / \`loop queue\``)
        );

      if (args[0].toLowerCase() === `musica` || args[0].toLowerCase() === `track` || args[0].toLowerCase() === `s` || args[0].toLowerCase() === `t`) {

        let embed = new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Successo | Loop na faixa alterado para: ${player.trackRepeat ? `${emoji.msg.disabled} Desabilitado` : `Habilitado`}`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)

        if (player.queueRepeat) {
          embed.setDescription(`A fila foi **${emoji.msg.disabled} desativada**`);
          player.setQueueRepeat(false);
        }

        player.setTrackRepeat(!player.trackRepeat);

        return message.channel.send(embed)
      }

      else if (args[0].toLowerCase() === `queue` || args[0].toLowerCase() === `qu` || args[0].toLowerCase() === `q`) {

        let embed = new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Successo | ${emoji.msg.repeat_mode} o loop está agora ${player.queueRepeat ? `${emoji.msg.disabled} desativado` : `${emoji.msg.enabled} ativo`}`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)

        if (player.trackRepeat) {
          embed.setDescription(`A repetição de música está **${emoji.msg.disabled} desabilitada**`);
          player.setTrackRepeat(false);
        }

        player.setQueueRepeat(!player.queueRepeat);

        return message.channel.send(embed);
      }

      else {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Por favor, adicione o métodoe em que deseja colocar o loop!`)
          .setDescription(`\`loop musica\` / \`loop queue\``)
        );
      }
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