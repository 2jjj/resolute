module.exports = {
  name: "pause",
  description: "pausar a música :D",
  category: "musica",
  usage: "",
  aliases: ["p"],
  cooldown: 1000 * 2, 
  
  run: async (client, message, args) => {

  console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)

  const serverQueue = client.queue.get(message.guild.id);
  const { channel } = message.member.voice;
  try {
    if (!channel)
      return message.channel.send(
        "Sinto muito, mas você precisa estar em um canal de voz para pausar a música!"
      );
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send(
        "Você precisa estar no mesmo canal de voz para pausar a música"
      );
    }
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true);
      return message.channel.send({
        embed: {
          color: "BLUE",
          description: "**⏸ Música pausada**"
        }
      });
    }
    return message.channel.send("**Não a nada tocando!**");
  } catch {
    serverQueue.connection.dispatcher.end();
    await channel.leave();
  }
}
};