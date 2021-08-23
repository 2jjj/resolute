const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `loopfila`,
  category: `🎶 Music`,
  aliases: [`repeatqueue`, `lq`, `rq`, `loopqu`, `repeatqu`, 'loopqueue'],
  description: `Colocar a fila em loop`,
  usage: `loopqueue`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    
    try {
      const embed = new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Successo | O loop da fila agora está ${player.queueRepeat ? `Desabilitado` : `Habilitado`}`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)

      if (player.trackRepeat) {
        //embed.setDescription(`And **Song** Repeat got **${emoji.msg.disabled} disabled**`);
        player.setTrackRepeat(false);
      }

      player.setQueueRepeat(!player.queueRepeat);

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
