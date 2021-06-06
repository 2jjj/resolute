module.exports = {
    name: "skip",
    description: "",
    category: "musica",
    usage: "",
    aliases: ["pular"],
    cooldown: 1000 * 2, 
    
    run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("Entre no canal de voz antes de usar esse comando.");
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send("Entre no meu canal de voz para usar esse comando.");
      }
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("❌ **Não a nada tocando nesse servidor.**");
  try {
    serverQueue.connection.dispatcher.end();
    return message.channel.send({
      embed:{
      color: "BLUE",
      description:"⏩ Skipped"
      }})
  } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send("Tente novamente.")
  }
}
};