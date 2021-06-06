module.exports = {
  name: "stop",
  aliases: ['parar'],
  cooldown: 1000 * 2, 
  description: "parar",
  category: "musica",
  usage: "<nome>",  

run: async (client, message, args) => {
  
  console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)

  const { channel } = message.member.voice;
  if (!channel){ message.channel.send("Entre em um canal de voz antes de usar esse comando.")}
  if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send("Você precisa estar no mesmo canal de voz que eu!");
    }
  const serverQueue = client.queue.get(message.guild.id);
try {
  if (serverQueue) {
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end()
  message.guild.me.voice.channel.leave();
  } else {
  channel.leave();
  }
  return message.channel.send({embed: {
    description:'↪ Desconectado'}})
} catch {
    serverQueue.connection.dispatcher.end();
    await channel.leave();
    return message.channel.send("Tente novamente.");
}
}
};