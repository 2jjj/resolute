const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `removetrack`,
  category: `🎶 Music`,
  aliases: [`rt`, `remove`],
  description: `Removes a track from the Queue`,
  usage: `removetrack <Trackindex>`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Erro | Por favor, adicione a faixa que você deseja remover!`)
          .setDescription(`Exemplo: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2}\``)
        );

      if (isNaN(args[0]))
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Erro | Tem que ser um número de fila válido!`)
          .setDescription(`Exemplo: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2}\``)
        );

      if (Number(args[0]) > player.queue.size)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Erro | Sua música deve estar na fila!`)
          .setDescription(`Exemplo: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2}\``)
        );

      player.queue.remove(Number(args[0]) - 1);

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Sucesso | ${emoji.msg.cleared} Eu removi a faixa na posição: \`${Number(args[0])}\``)
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