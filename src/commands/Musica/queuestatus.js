const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
const { createBar } = require(`../../handlers/functions`);

module.exports = {
  name: `queuestatus`,
  category: `🎶 Music`,
  aliases: [`qs`, `status`, `queuestats`, `qus`],
  description: `Mostra os status da fila`,
  usage: `queuestatus`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {

      let embed = new MessageEmbed()
      try {
        embed.setTitle(`Conectado em:  \`🔈${client.channels.cache.get(player.voiceChannel).name}\``)
      } catch { }
      try {
        embed.setDescription(`E ligado em: \`#${client.channels.cache.get(player.textChannel).name}\`   **▬**   Tamanho da fila: \`${player.queue.length} Músicas\``)
      } catch { }
      try {
        embed.addField(`${emoji.msg.raise_volume} Volume`, `${player.volume}%`, true)
      } catch { }
      try {
        embed.addField(`${emoji.msg.equalizer} Equalizador: `, `${emoji.msg.playing} Music`, true)
      } catch { }
      try {
        embed.addField(`${player.queueRepeat ? `${emoji.msg.autoplay_mode} Queue Loop: ` : `${emoji.msg.autoplay_mode} Song Loop: `}`, `${player.queueRepeat ? `${emoji.msg.SUCCESS} Habilitado` : player.trackRepeat ? `${emoji.msg.SUCCESS} Habilitado` : `${emoji.msg.ERROR} Desabilitado`}`, true)
      } catch { }
      try {
        embed.addField(`${emoji.msg.leave_on_empty} Sair quando o canal estiver vazio: `, `${config.settings.leaveOnEmpty_Channel.enabled ? `${emoji.msg.SUCCESS} Habilitado` : `${emoji.msg.ERROR} Desabilitado`}`, true)
      } catch { }
      try {
        embed.addField(`${emoji.msg.repeat_mode} Sair quando a fila estivar vazia:`, `${config.settings.LeaveOnEmpty_Queue.enabled ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch { }
      try {
        embed.addField(`${emoji.msg.autoplay_mode} Autoplay`, `${player.get(`autoplay`) ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch { }
      /*try {
        embed.addField(`${emoji.msg.premium} Premium GUILD`, `${client.premium.get(player.guild).enabled ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch { }
      try {
        embed.addField(`${emoji.msg.premium} Premium USER`, `${client.premium.get(player.get(`playerauthor`)).enabled ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch { }*/
      try {
        embed.addField(`${emoji.msg.premium} 24/7 AFK Setup`, `PLAYER: ${player.get(`afk-${player.get(`playerauthor`)}`) ? `${emoji.msg.SUCCESS} Habilitado` : `${emoji.msg.ERROR} Desabilitado`}\nServidor: ${player.get(`afk-${player.guild}`) ? `${emoji.msg.SUCCESS} Habilitado` : `${emoji.msg.ERROR} Desabilitado`}`, true)
      } catch { }
      try {
        embed.setColor(ee.color)
      } catch { }
      try {
        embed.setFooter(ee.footertext, ee.footericon);
      } catch { }
      try {
        embed.addField(`${emoji.msg.disk} Faixa atual: `, `${player.playing ? `${emoji.msg.resume}` : `${emoji.msg.pause}`} [**${player.queue.current.title}**](${player.queue.current.uri})`)
      } catch { }
      try {
        embed.addField(`${emoji.msg.time} Progresso: `, createBar(player))
      } catch { }
      message.inlineReply(embed);
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