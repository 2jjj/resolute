const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`); 

module.exports = {
  name: `grab`,
  category: `🎶 Music`,
  aliases: [`save`, `yoink`],
  description: `Salvar a música atual na sua DM`,
  usage: ``,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},

  run: async (client, message, args, cmduser, text, prefix, player) => {
  
   message.author.send(new MessageEmbed()
   .setAuthor(`Música salva:`, message.author.displayAvatarURL({
    dynamic: true
  }))
  .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
  .setURL(player.queue.current.uri)
  .setColor(ee.color)
  .setFooter(ee.footertext, ee.footericon)
  .setTitle(`${player.playing ? `${emoji.msg.resume}` : `${emoji.msg.pause}`} **${player.queue.current.title}**`)
  .addField(`${emoji.msg.time} Duração: `, `\`${format(player.queue.current.duration)}\``, true)
  .addField(`${emoji.msg.song_by} Artista: `, `\`${player.queue.current.author}\``, true)
  .addField(`${emoji.msg.repeat_mode} Tamanho da fila: `, `\`${player.queue.length} Músicas\``, true)
  .addField(`${emoji.msg.playing} Toque:`, `\`${prefix}play ${player.queue.current.uri}\``)
  .addField(`${emoji.msg.search} Salvo em:`, `<#${message.channel.id}>`)
  .setFooter(`Requisitado por: ${player.queue.current.requester.tag} | in: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: Sua DM está desabilitada.**")
    })    

    message.react(emoji.react.SUCCESS).catch(e=>console.log("Could not react"))
  }
};