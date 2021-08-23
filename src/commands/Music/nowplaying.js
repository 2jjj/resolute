const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);

module.exports = {
  name: `nowplaying`,
  category: `🎶 Music`,
  aliases: [`np`, `current`],
  description: `Mostra informações sobre a música atual`,
  usage: `nowplaying`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      if (!player.queue.current)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Não a nada tocando.`)
        );

      return message.channel.send(new MessageEmbed()
        .setAuthor(`Current song playing:`, message.author.displayAvatarURL({
          dynamic: true
        }))
        .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
        .setURL(player.queue.current.uri)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${player.playing ? `${emoji.msg.resume}` : `${emoji.msg.pause}`} **${player.queue.current.title}**`)
        .addField(`${emoji.msg.time} Duração: `, `\`${format(player.queue.current.duration)}\``, true)
        .addField(`${emoji.msg.song_by} Música por: `, `\`${player.queue.current.author}\``, true)
        .addField(`${emoji.msg.repeat_mode} Tamanho da fila: `, `\`${player.queue.length} Songs\``, true)
        .addField(`${emoji.msg.time} Progresso: `, createBar(player))
        .setFooter(`Requisitado por: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
          dynamic: true
        }))
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