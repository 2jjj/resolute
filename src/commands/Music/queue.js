const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  format,
  delay,
  swap_pages,
  swap_pages2
} = require(`../../handlers/functions`);

module.exports = {
  name: `queue`,
  category: `🎶 Music`,
  aliases: [`qu`, `que`, `queu`, `list`, `fila`],
  description: `Shows the Queue`,
  usage: `queue`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      const tracks = player.queue;
      
      if (!tracks.length)
        return message.channel.send(new MessageEmbed()
          .setAuthor(`Fila de ${message.guild.name}  -  [ ${player.queue.length} Faixas ]`, message.guild.iconURL({
            dynamic: true
          }))
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.color).addField(`**0) Faixa atual**`, `**${player.queue.current.title.substr(0, 60)}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n*Requisitado por: ${player.queue.current.requester.tag}*`)
          .setDescription(`${emoji.msg.ERROR} Sem faixas na fila.`)
        ).then(msg => {
          try {
            msg.delete({
              timeout: 5000
            }).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          } catch { /* */ }
        })

      if (tracks.length < 15)
        return message.channel.send(new MessageEmbed()
          .setAuthor(`Fila de ${message.guild.name}  -  [ ${player.queue.length} Faixas ]`, message.guild.iconURL({
            dynamic: true
          }))
          .setFooter(ee.footertext, ee.footericon)
          .addField(`**0) Faixa atual**`, `**${player.queue.current.title.substr(0, 60)}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n*Requisitado por: ${player.queue.current.requester.tag}*`)
          .setColor(ee.color).setDescription(tracks.map((track, i) => `**${++i})** **${track.title.substr(0, 60)}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n*Requisitado por: ${track.requester.tag}*`).join(`\n`))
        ).then(msg => {
          try {
            msg.delete({
              timeout: 5000
            }).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          } catch { /* */ }
        })

      let quelist = [];
      for (let i = 0; i < tracks.length; i += 15) {
        let songs = tracks.slice(i, i + 15);
        quelist.push(songs.map((track, index) => `**${i + ++index})** **${track.title.substr(0, 60)}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n*Requisitado por: ${track.requester.tag}*`).join(`\n`))
      }
      let limit = quelist.length <= 5 ? quelist.length : 5
      let embeds = []
      for (let i = 0; i < limit; i++) {
        let desc = String(quelist[i]).substr(0, 2048)
        await embeds.push(new MessageEmbed()
          .setAuthor(`Fila de ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
            dynamic: true
          }))
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.color)
          .addField(`**0) Faixa atual**`, `**${player.queue.current.title.substr(0, 60)}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n*Requisitado por: ${player.queue.current.requester.tag}*`)
          .setDescription(desc));
      }

      return swap_pages2(client, message, embeds)
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