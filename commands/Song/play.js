const { MessageEmbed } = require(`discord.js`);
const playermanager = require(`../../handlers/lavalink/playermanager`);
module.exports = {
    name: `play`,
    category: `Song`,
    aliases: [`p`],
    description: `Plays a song from youtube`,
    usage: `play <link/query>`,
    run: async (client, message, args, cmduser, text, prefix) => {
      const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
      const botchannel = message.guild.me.voice.channel;

      const player = client.manager.players.get(message.guild.id);
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      if(message.content.includes("youtu")){
        message.channel.send(`<:youtube:826100274095194132> **Searching** :mag_right: \`${args.join(" ")}\``)
        playermanager(client, message, args, `play:youtube`);
      } else if(message.content.includes("spotify")){
        message.channel.send(`<:spotify:818555971873013761>**Searching** :mag_right: \`${args.join(" ")}\``)
        playermanager(client, message, args, `play:youtube`);
      } else if(message.content.includes("soundcloud")){
        message.channel.send(`<:soundcloud:818555972079321128> **Searching** :mag_right: \`${args.join(" ")}\``)
        playermanager(client, message, args, `play:soundcloud`);
    } else if(message.content.includes("http")){
      message.channel.send(`<:rythm:826519647347539990> **Searching** :mag_right: \`${args.join(" ")}\``)
      playermanager(client, message, args, `play:youtube`);
    } else {
      message.channel.send(`<:youtube:826100274095194132> **Searching** :mag_right: \`${args.join(" ")}\``)
      playermanager(client, message, args, `play:youtube`);
    }
  }
};