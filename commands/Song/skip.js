module.exports = {
  name: `skip`,
  category: `Song`,
  aliases: [`next`, "s"],
  description: `Votes to skip the current playing song`,
  usage: `skip`,
  run: async (client, message, args, cmduser, text, prefix) => {
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);
    if (!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Nothing playing in this server**`);
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    player.stop();
    return message.channel.send(`**:fast_forward: Skipped :thumbsup:**`);
  }
};
