module.exports = {
  name: "despausar",
  aliases: ['resume'],
  cooldown: 1000 * 2, 
  description: "Obter a fila.",
  category: "musica",
  usage: "",

  run: async (client, message, args) => {

  console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)

  const { channel } = message.member.voice;
  if (!channel) { message.channel.send("Você precisa estar no canal de voz para usar esse comando")
  }
  const serverQueue = client.queue.get(message.guild.id);
  if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send("Entre no meu canal para me usar.");
  }
try {
  if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send({embed:{
color: "BLUE",                                       description:`▶ **Música foi pulada com sucesso por ${message.author}**`}});
  }
  return message.channel.send('**Não a nada que eu possa pular**.');
} catch {
  serverQueue.connection.dispatcher.end();
  return message.channel.send("**Tente novamente.**")
}
}
};