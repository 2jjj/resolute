const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");
const db = require("quick.db")

module.exports = {
  name: "pause",
  aliases: ['pausar'],
  cooldown: 1000 * 2, 
  description: "pause",
  category: "musica",

  async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

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
      .setDescription("Música pausada.")
      .setColor("YELLOW")
      return message.channel.send(xd);
    }
    return sendError("> Não a nada tocando.", message.channel);
  },
};