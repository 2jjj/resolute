const { format } = require(`../../handlers/functions`);

module.exports = {
  name: "avancar",
  aliases: [],
  cooldown: 2000 * 2,
  description: "Avança um determinado tempo na música.",
  category: "music",
  usage: "<tempo>",
  example: "10",

  async run(client, message, args) {

    if (!args[0]) return;

    const { channel } = message.member.voice;

    if (!channel) return message.channel.send(`:x: **Você deve estar em um canal de voz para usar este comando.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);

    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);

    if (!player || !botchannel) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);

    if (player && channel.id !== player.voiceChannel) {
      return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);
    }

    let seektime = Number(player.position) + Number(args[0]) * 1000;

    if (Number(args[0]) <= 0) seektime = Number(player.position);
    if (Number(seektime) >= player.queue.current.duration)
      return message.channel.send(`**:x: O tempo não pode ser maior que a música**`);
    player.seek(Number(seektime));
    return message.channel.send(`**:musical_note: Defini a posição para \`${format(player.position)}\` :fast_forward:**`);
  }
};