const playermanager = require(`../../handlers/lavalink/playermanager`);

module.exports = {
  name: "soundcloud",
  aliases: [],
  cooldown: 2000 * 2,
  description: "",
  category: "music",
  usage: "",
  example: "",

  async run(client, message, args) {
    
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);

    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);

    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    if (message.content.includes("youtu")) {
      message.channel.send(`<:yt:861682089049325598> **Procurando** :mag_right: \`${args.join(" ")}\``)
      playermanager(client, message, args, `play:youtube`);
    } else if (message.content.includes("spotify")) {
      message.channel.send(`<:spotify:861682475809505310> **Procurando** :mag_right: \`${args.join(" ")}\``)
      playermanager(client, message, args, `play:youtube`);
    } else if (message.content.includes("soundcloud")) {
      message.channel.send(`<:spr4y:861682475393482764> **Procurando** :mag_right: \`${args.join(" ")}\``)
      playermanager(client, message, args, `play:soundcloud`);
    } else if (message.content.includes("http")) {
      message.channel.send(`🎵 **Procurando** :mag_right: \`${args.join(" ")}\``)
      playermanager(client, message, args, `play:soundcloud`);
    } else {
      message.channel.send(`<:yt:861682089049325598> **Procurando** :mag_right: \`${args.join(" ")}\``)
      playermanager(client, message, args, `play:soundcloud`);
    }}
};
