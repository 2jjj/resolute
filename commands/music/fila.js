const { MessageEmbed } = require('discord.js')
const discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "fila",
    aliases: ['queue'],
    cooldown: 1000 * 2, 
    description: "fila",
    category: "musica",
  
    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const channel = message.member.voice.channel;
    if (!channel) { 
        let embed23 = new discord.MessageEmbed()
        .setTitle('Erro')
        .setColor('#000001')
        .setDescription(`<:Resoluteinfo:844971535927083088> Você precisa estar em um canal de voz para digitar esse comando!`)
        return message.channel.send(embed23)
    }
    
    const queue = message.client.queue.get(message.guild.id)
    let status;
    if(!queue) status = '<:Resoluteinfo:844971535927083088> Não há nada na fila!'
    else status = queue.songs.map(x => '• ' + x.title)
    if(!queue) np = status
    else np = queue.songs[0].title
    if(queue) thumbnail = queue.songs[0].thumbnail
    else thumbnail = message.guild.iconURL()
    let embed = new MessageEmbed()
    .setTitle('Lista de músicas')
    .setImage(thumbnail)
    .setColor('#000001')
    .addField('<:Resoluteinfo:844971535927083088> Tocando agora:', np, true)
    .setDescription(status)
    message.channel.send(embed)
}}