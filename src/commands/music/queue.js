const { MessageEmbed } = require('discord.js')
const discord = require('discord.js')

exports.run = async (client, message) => {
    const channel = message.member.voice.channel;
    if (!channel) { 
        let embed23 = new discord.MessageEmbed()
        .setTitle('Um erro foi encontrado!')
        .setColor('#000001')
        .setDescription(`Você precisa estar em um canal de voz para digitar esse comando!`)
        return message.channel.send(embed23)
    }
    
    const queue = message.client.queue.get(message.guild.id)
    let status;
    if(!queue) status = 'Não há nada na fila!'
    else status = queue.songs.map(x => '• ' + x.title)
    if(!queue) np = status
    else np = queue.songs[0].title
    if(queue) thumbnail = queue.songs[0].thumbnail
    else thumbnail = message.guild.iconURL()
    let embed = new MessageEmbed()
    .setTitle('Lista de músicas')
    .setImage(thumbnail)
    .setColor('#000001')
    .addField('Tocando agora:', np, true)
    .setDescription(status)
    message.channel.send(embed)
}