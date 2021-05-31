const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");
const db = require("quick.db")

module.exports = {
  name: "stio",
  aliases: ['parar'],
  cooldown: 1000 * 2, 
  description: "parar",
  category: "musica",

  async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const channel = message.member.voice.channel
    if (!channel)return sendError("➥ Sinto muito, mas você precisa estar em um canal de voz para tocar música!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("➥ Não há nada que eu possa pular para você.", message.channel);
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return sendError(`> A fila foi liberada. ${error}`, message.channel);
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react(`<:check:843604256455000075>`)
  },
};