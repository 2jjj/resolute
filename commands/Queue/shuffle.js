module.exports = {
  name: "shuffle",
  aliases: [],
  cooldown: 2000 * 2,
  description: "Ordem aleatória de toda a fila.",
  category: "music",
  usage: "",
  example: "",

  async run(client, message, args) {
    const { channel } = message.member.voice;

    if (!channel) return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver surdo**`);

    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);

    if (!player || !botchannel) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);
    if (!player.current < 1) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);
    
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    player.set(`beforeshuffle`, player.queue.map(track => track));
    player.queue.shuffle();
    return message.channel.send(`**:boom: Pronto! agora o shuffle está ativado :stop_button:**`);

  }
};