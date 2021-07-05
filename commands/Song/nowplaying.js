const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `nowplaying`,
  category: `Song`,
  aliases: [`np`,],
  description: `Shows what song Rythm is currently playing.`,
  usage: `nowplaying`,
  run: async (client, message, args, cmduser, text, prefix) => {
    const { channel } = message.member.voice;
    if (!channel)  return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    if(message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);
    if(!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Nothing playing in this server**`);
    if(player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
    message.channel.send(new MessageEmbed()
      .setAuthor("Now Playing ♪", client.user.displayAvatarURL(), "https://milrato.eu")
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL("https://milrato.eu")
      .setColor("0056bf")
      .setDescription(`[${player.queue.current.title.split("[").join("\[").split("]").join("\]")}](${player.queue.current.uri})\n\n\`${createBar(player)}\`\n\n\`${format(player.position).split(" | ")[0]} / ${format(player.queue.current.duration).split(" | ")[0]}\`\n\n\`Requested by:\` ${player.queue.current.requester.username} (${player.queue.current.requester.tag})`)
    ).catch(e=>{
      return message.channel.send("**:x: Your Dm's are disabled**")
    })    

  }
};