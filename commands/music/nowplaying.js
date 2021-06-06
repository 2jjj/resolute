const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "nowplaying",
  description: "a",
  category: "musica",
  usage: "<song_name>",
  aliases: ["np"],
  cooldown: 1000 * 2, 

  run: async function(client, message, args) {

   const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('Você precisa estar em um canal de voz para utilizar o comando!');
    let queue = message.client.queue.get(message.guild.id)
    if(!queue) return message.channel.send({
        embed:{
            title: 'Não tem nada tocando agora!'
        }
    })
    message.channel.send({
        embed:{
            title: 'Now Playing',
            description: queue.songs[0].title,
            color: 'GREEN',
            thumbnail: queue.songs[0].thumbnail
        }
    })
}}