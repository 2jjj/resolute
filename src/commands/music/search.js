const playermanager = require(`../../handlers/lavalink/playermanager`);

module.exports = {
  name: "search",
  aliases: ['pesquisar'],
  cooldown: 2000 * 2,
  description: "Pesquisa uma música no Youtube por meio de sua consulta e retorna os 10 principais resultados.",
  category: "music",
  usage: "<nome>",
  example: "NCS Musics",
  args: true,

  async run(client, message, args) {

    if (!args[0]) return;

    const { channel } = message.member.voice;

    if (!channel) return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);

    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);
    
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);

    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    playermanager(client, message, args, `search:youtube`);
  }
};