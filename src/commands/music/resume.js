module.exports = {
  name: "resume",
  aliases: ['despausar'],
  cooldown: 2000 * 2,
  description: "Retoma a música pausada.",
  category: "music",
  usage: "",
  example: "",
  args: false,

  async run(client, message, args) {

    const { channel } = message.member.voice;
    
    if (!channel) return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);

    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);

    if (!player || !botchannel) return message.channel.send(`**:x: Não há nada tocando neste servidor**`);
    if (!player.current < 1) return message.channel.send(`**:x: Não há nada tocando neste servidor**`);

    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    
    if (player.playing)
      return message.channel.send(`**:x: O Player não está pausado**`);
    player.pause(false);
    return message.channel.send(`**:play_pause: Música retomada... :thumbsup:**`);
  }
};