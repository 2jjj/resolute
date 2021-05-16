const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "pause",
    description: "Para pausar a musica que está tocando",
    usage: "",
    aliases: ["pause", "pausar"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(` ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Musica pausada para você!")
      .setColor("YELLOW")
      .setTitle("Musica pausada.")
      return message.channel.send(xd);
    }
    return sendError("Não ha nada tocando.", message.channel);
  },
};