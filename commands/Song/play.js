const playermanager = require(`../../handlers/lavalink/playermanager`);

module.exports = {
  name: "play",
  aliases: [],
  cooldown: 2000 * 2,
  description: "",
  category: "music",
  usage: "",
  example: "",

  async run(client, message, args) {

      const { channel } = message.member.voice;
      if (!channel) return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);

      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);
      const botchannel = message.guild.me.voice.channel;

      const player = client.manager.players.get(message.guild.id);
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);

      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      if(message.content.includes("youtu")){
        message.channel.send(`<:youtube:826100274095194132> **Procurando** :mag_right: \`${args.join(" ")}\``)
        playermanager(client, message, args, `play:youtube`);
      } else if(message.content.includes("spotify")){
        message.channel.send(`<:spotify:818555971873013761>**Procurando** :mag_right: \`${args.join(" ")}\``)
        playermanager(client, message, args, `play:youtube`);
      } else if(message.content.includes("soundcloud")){
        message.channel.send(`<:soundcloud:818555972079321128> **Procurando** :mag_right: \`${args.join(" ")}\``)
        playermanager(client, message, args, `play:soundcloud`);
    } else if(message.content.includes("http")){
      message.channel.send(`<:rythm:826519647347539990> **Procurando** :mag_right: \`${args.join(" ")}\``)
      playermanager(client, message, args, `play:youtube`);
    } else {
      message.channel.send(`<:youtube:826100274095194132> **Procurando** :mag_right: \`${args.join(" ")}\``)
      playermanager(client, message, args, `play:youtube`);
    }
  }
};