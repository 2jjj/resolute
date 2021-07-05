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
  name: `grab`,
  category: `Song`,
  aliases: [`save`, `yoink`],
  description: `Saves the current playing song to your Direct Messages`,
  usage: `grab`,
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
    let date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length ==1 ? "0" + new Date().getMonth() : new Date().getMonth()}-${String(new Date().getDate()).length ==1 ? "0" + new Date().getDate() : new Date().getDate()}`;
    message.author.send(new MessageEmbed()
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL("https://milrato.eu")
      .setColor("GREEN")
      .setTitle("Song saved :musical_note:")
      .setDescription(`[${player.queue.current.title.split("[").join("\[").split("]").join("\]")}](${player.queue.current.uri})\n\n\`Length:\` ${format(player.queue.current.duration).split(" | ")[0]}\n\n\`Requested by:\` ${player.queue.current.requester.username} (${player.queue.current.requester.tag})`)
      .setFooter(`${date} - ${message.guild.name}`)
    ).catch(e=>{
      return message.channel.send("**:x: Your Dm's are disabled**")
    })    

    message.react("📭").catch(e=>console.log("Could not react"))
  }
};
