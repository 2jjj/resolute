const { MessageEmbed } = require(`discord.js`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);

module.exports = {
  name: "nowplaying",
  aliases: ['np'],
  cooldown: 2000 * 2,
  description: "Mostra qual música que o Resolute está tocando no momento.",
  category: "music",
  usage: "",
  example: "",

  async run(client, message, args) {

    const { channel } = message.member.voice;

    if (!channel) return message.channel.send(`:x: *Você precisa estar em um canal de voz para usar este comando.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);

    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);

    if (!player || !botchannel) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);

    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);
    message.channel.send(new MessageEmbed()
      .setAuthor("Agora está tocando ♪", client.user.displayAvatarURL(), "https://resolutebot.xyz")
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL("https://resolutebot.xyz")
      .setColor("0056bf")
      .setDescription(`[${player.queue.current.title.split("[").join("\[").split("]").join("\]")}](${player.queue.current.uri})\n\n\`${createBar(player)}\`\n\n\`${format(player.position).split(" | ")[0]} / ${format(player.queue.current.duration).split(" | ")[0]}\`\n\n\`Requested by:\` ${player.queue.current.requester.username} (${player.queue.current.requester.tag})`)
    ).catch(e => {
      return message.channel.send("**:x: Sua DM está desabilitada.**")
    })
  }
};