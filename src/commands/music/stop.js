const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "stop",
    description: "Parar a musica.",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const channel = message.member.voice.channel
    if (!channel)return sendError("<:Resoluteinfo:844971535927083088> Sinto muito, mas você precisa estar em um canal de voz para tocar música!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("<:Resoluteinfo:844971535927083088> Não há nada que eu possa pular para você.", message.channel);
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return sendError(`<:Resoluteinfo:844971535927083088> A fila foi liberada. ${error}`, message.channel);
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react(`<:check:843604256455000075>`)
  },
};