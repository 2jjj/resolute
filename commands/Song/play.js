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
      if (!args[0]) {
        let string = `${prefix}play <link/query>`
        let embed = new MessageEmbed()
        .setTitle("**:x: Invalid usage**")
        .setDescription(string)
        .setColor("#ff0000")
        if(message.guild.me.hasPermission("EMBED_LINKS")){
          message.channel.send(embed)
        }else{
          message.channel.send("**:x: Invalid usage**\n"+string)
        }
        return;
      }
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
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
