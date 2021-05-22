const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "resume",
    description: "Para despausar a musica.",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("<:info:835206734225473546> | Musica despausada.")
      .setColor("YELLOW")
      .setAuthor("Musica despausada!", "https://cdn.discordapp.com/attachments/837826996460453898/841740447226527754/blurple.png")
      return message.channel.send(xd);
    }
    return sendError("Não esta tocando nesse servidor", message.channel);
  },
};