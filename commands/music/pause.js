const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");
const db = require("quick.db")

module.exports = {
  info: {
    name: "pause",
    cooldown: 3000 * 5, 
    description: "pausar a musica que está tocando",
    usage: "",
    aliases: ["pause", "pausar"],
  },

  run: async function (client, message, args) {

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
      .setDescription("Musica pausada.")
      .setColor("YELLOW")
      return message.channel.send(xd);
    }
    return sendError("<:Resoluteinfo:844971535927083088> Não ha nada tocando.", message.channel);
  },
};