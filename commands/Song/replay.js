module.exports = {
  name: `replay`,
  category: `Song`,
  aliases: [``],
  description: `Resets the progress of the current song.`,
  usage: `replay`,
  run: async (client, message, args, cmduser, text, prefix) => {
      //get the voice channel of the member
      const { channel } = message.member.voice;
      //if he is not connected to a vc return error
      if (!channel)  return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);
      //send error if member is Deafed
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);
      //get voice channel of the bot
      const botchannel = message.guild.me.voice.channel;
      //get the music player
      const player = client.manager.players.get(message.guild.id);
      //if no player or no botchannel return error
      if(!player || !botchannel) return message.channel.send(`**:x: Não há nada tocando neste servidor**`);
      //if queue size too small return error
      if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Não há nada tocando neste servidor**`);
      //if user is not in the right channel as bot, then return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);
      //seek to the new Seek position
      player.seek(0);
      //Send Success Message
      return message.channel.send(`**:musical_note: O tempo do som foi resetado :track_previous:**`);
  }
};
