module.exports = {
  name: "stop",
  aliases: ['parar'],
  cooldown: 1000 * 2, 
  description: "parar",
  category: "musica",
  usage: "<nome>",  

run: async (client, message, args) => {
  const { channel } = message.member.voice;
  if (!channel){ message.channel.send("JOIN VOICE CHANNEL BEFORE USING THIS COMMANDS!")}
  if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send("BE IN SAME VOICE CHANNEL");
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
    description:'↪ Disconnected'}})
} catch {
    serverQueue.connection.dispatcher.end();
    await channel.leave();
    return message.channel.send("TRY AGAIN");
}
}
};