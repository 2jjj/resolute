module.exports = {
  name: `loop`,
  aliases: [],
  cooldown: 2000 * 2,
  description: "",
  category: "music",
  usage: "",
  example: "",

  async run(client, message, args) {

      const { channel } = message.member.voice;
      if (!channel)  return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
      const botchannel = message.guild.me.voice.channel;
      const player = client.manager.players.get(message.guild.id);
      if(!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
      if(!player.current < 1) return message.channel.send(`**:x: Nothing playing in this server**`);
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      player.setTrackRepeat(!player.trackRepeat);
      return message.channel.send(`**${player.trackRepeat ? `:repeat_one: Enabled` : `:repeat_one: Disabled`}**`);
  }
};
