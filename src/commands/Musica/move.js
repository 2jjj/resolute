const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  format,
  arrayMove
} = require(`../../handlers/functions`);

module.exports = {
  name: `move`,
  category: `🎶 Music`,
  aliases: [`mv`],
  description: ``,
  usage: `<de> <para>`,
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
          .setTitle(`${emoji.msg.ERROR} | Modo de uso errado.`)
          .setDescription(`Uso: \`${prefix}move <de> <para>\`\nExemplo: \`${prefix}move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2} 1\``)
        );

      if (!args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} | Modo de uso errado.`)
          .setDescription(`Uso: \`${prefix}move <de> <para>\`\nExemplo: \`${prefix}move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2} 1\``));

      if (isNaN(args[0]) || args[0] <= 1 || args[0] > player.queue.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} | Você deve fornecer um número entre \`1\` e \`${player.queue.length}\``)
        );

      let song = player.queue[player.queue.length - 1];

      let QueueArray = arrayMove(player.queue, player.queue.length - 1, 0);

      player.queue.clear();

      for (const track of QueueArray)
        player.queue.add(track);

      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Successo | Movi o som da fila \`${args[0]}\` para a posição: \`${args[1]}\``)
        .setThumbnail(song.displayThumbnail())
        .setDescription(`[${song.title}](${song.uri}) - \`${format(song.duration)}\` - Requisitado por **${song.requester.tag}**`)
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