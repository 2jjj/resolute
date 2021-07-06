module.exports = {
  name: `replay`,
  category: `Song`,
  aliases: [``],
  description: `Resets the progress of the current song.`,
  usage: `replay`,
  run: async (client, message, args, cmduser, text, prefix) => {
      const { channel } = message.member.voice;
      if (!channel)  return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);

      const botchannel = message.guild.me.voice.channel;
      const player = client.manager.players.get(message.guild.id);

      if(!player || !botchannel) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);
      if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);

      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);
        
      player.seek(0);
      return message.channel.send(`**:musical_note: O tempo do som foi resetado :track_previous:**`);
  }
};
