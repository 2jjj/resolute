module.exports = {
  name: "pause",
  aliases: ['pausar', 'stop'],
  cooldown: 2000 * 2,
  description: "Pausa a faixa em reprodução atual",
  category: "music",
  usage: "",
  example: "",

  async run(client, message, args) {

    const { channel } = message.member.voice;

    if (!channel) return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);

    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);

    if (!player || !botchannel) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);

    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Não há nada tocando neste servidor**`);
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    if (!player.playing)
      return message.channel.send(`**:x: O Player já está pausado.**`);
    player.pause(true);
    return message.channel.send(`**Pausado :pause_button:**`);
  }
};