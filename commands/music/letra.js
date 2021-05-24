const { MessageEmbed } = require("discord.js");
const db = require("quick.db")

exports.run = async(client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Não tem nada tocando no momento").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `<:Resoluteinfo:844971535927083088> Não encontrei letras para essa ${queue.songs[0].title} :(`;
    } catch (error) {
      lyrics = `<:Resoluteinfo:844971535927083088> Não encontrei letras para essa ${queue.songs[0].title} :(`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`Letras da **${queue.songs[0].title}**`)
      .setDescription(lyrics)
      .setColor("GREEN")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
}