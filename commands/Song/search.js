const playermanager = require(`../../handlers/lavalink/playermanager`);

module.exports = {
  name: "search",
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
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);

      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      playermanager(client, message, args, `search:youtube`);
  }
};
