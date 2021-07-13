module.exports = {
  name: "loopfila",
  aliases: ['loopqueue'],
  cooldown: 2000 * 2,
  description: "Alterna o loop para toda a fila.",
  category: "music",
  usage: "",
  example: "",
  args: false,

  async run(client, message, args) {

    const { channel } = message.member.voice;

    if (!channel) return message.channel.send(`:x: ** Você precisa estar em um canal de voz para usar este comando. **`);

    if (message.member.voice.selfDeaf) return message.channel.send(`:x: ** Você não pode executar este comando enquanto estiver surdo **`);

    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);

    if (!player || !botchannel) return message.channel.send(`**:x: Não a nada reproduzindo neste servidor**`);
    if (!player.current < 1) return message.channel.send(`**:x: Não a nada reproduzindo neste servidor**`);

    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    player.setQueueRepeat(!player.queueRepeat);
    return message.channel.send(`**${player.queueRepeat ? `:repeat: Loop da fila está habilitado` : `:no_entry_sign: Loop da fila desabilitado`}**`);
  }
};