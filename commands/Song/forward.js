const {
  MessageEmbed
} = require(`discord.js`)
const config = require(`../../botconfig/config.json`)
const ee = require(`../../botconfig/embed.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `forward`,
  category: `Song`,
  aliases: [`fwd`],
  description: `Forwards by a certain amount of time in the current track.`,
  usage: `forward <time>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    const {
      channel
    } = message.member.voice;
    if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);
    if (!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Nothing playing in this server**`);
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
    if (!args[0]) {
      let string = `${prefix}forward <Time in seconds>`
      let embed = new MessageEmbed()
        .setTitle("**:x: Invalid usage**")
        .setDescription(string)
        .setColor("#ff0000")
      if (message.guild.me.hasPermission("EMBED_LINKS")) {
        message.channel.send(embed)
      } else {
        message.channel.send("**:x: Invalid usage**\n" + string)
      }
      return;
    }
    let seektime = Number(player.position) + Number(args[0]) * 1000;
    if (Number(args[0]) <= 0) seektime = Number(player.position);
    if (Number(seektime) >= player.queue.current.duration)
      return message.channel.send(`**:x: Time cannot be longer than the song**`);
    player.seek(Number(seektime));
    return message.channel.send(`**:musical_note: Set position to \`${format(player.position)}\` :fast_forward:**`);
  }
};