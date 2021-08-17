const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `loopsong`,
  category: `🎶 Music`,
  aliases: [`repeatsong`, `ls`, `rs`, `repeattrack`, `looptrack`, `lt`, `rt`],
  description: `Repeats the current song`,
  usage: `loopsong`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    
    try {
      const embed = new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Successo | O loop na faixa está ${player.trackRepeat ? `${emoji.msg.disabled} Desabilitado` : `${emoji.msg.enabled} Habilitado`}`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)

      if (player.queueRepeat) {
        //embed.setDescription(`And **Queue** Repeat got **${emoji.msg.disabled} disabled**`);
        player.setQueueRepeat(false);
      }

      player.setTrackRepeat(!player.trackRepeat);

      return message.channel.send(embed);
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