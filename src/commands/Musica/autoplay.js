const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);

module.exports = {
  name: `autoplay`,
  category: `🎶 Music`,
  aliases: [`ap`, `toggleauto`, `toggleautoplay`, `toggleap`],
  description: `Liga ou desliga o autoplay`,
  usage: `autoplay`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      player.set(`autoplay`, !player.get(`autoplay`))
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Successo | ${player.get(`autoplay`) ? `Habilitado` : `Desabilitado`}`)
        .setDescription(`Para ${player.get(`autoplay`) ? `desabilitar` : `habilitar` } escreva: \`${prefix}autoplay\``)
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