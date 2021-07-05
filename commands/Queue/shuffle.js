module.exports = {
  name: "loopqueue",
  aliases: [],
  cooldown: 2000 * 2,
  description: "",
  category: "music",
  usage: "",
  example: "",

  async run(client, message, args) {
      const { channel } = message.member.voice;
      if (!channel)  return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver surdo**`);
      const botchannel = message.guild.me.voice.channel;
      const player = client.manager.players.get(message.guild.id);
      if(!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
      if(!player.current < 1) return message.channel.send(`**:x: Nothing playing in this server**`);
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      player.set(`beforeshuffle`, player.queue.map(track => track));
      player.queue.shuffle();
     return message.channel.send(`**:boom: Cleared... :stop_button:**`);

  }
};