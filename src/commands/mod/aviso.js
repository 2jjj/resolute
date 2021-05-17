const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (bot, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    var list = [
        'https://imgur.com/ZNuAcum.gif',
        'https://imgur.com/xlD7P3N.gif',
        'https://imgur.com/cT6TUwv.gif',
        'https://imgur.com/7l7n5un.gif',
        'https://imgur.com/NYZsPRx.gif',
        'https://imgur.com/gVAiCX6.gif',
        'https://imgur.com/usOD4UR.gif',
        'https://imgur.com/4uDadjQ.gif'
      ]
    
    var rand = list[Math.floor(Math.random() * list.length)]

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("<:staff:835643948151996446> **|** Sem permissão! | Permissão necessária:ADMINISTRATOR ") 

    let membro = message.mentions.users.first() 
    if (!membro) return message.reply("<:4693_pink_hair_popcorn:843542215708114994> oh ixpertinho você tem que **mencionar** o usuário para dar o aviso!")

    let motivo = args.slice(1).join(" "); 
    if (!motivo) return message.reply("<:staff:835643948151996446> **|** Escreva um motivo do aviso do usuário!") 

    let embed = new Discord.MessageEmbed() 
    .setTitle(`WARN - ${membro.username}`)
    .setColor('RANDOM')
    .setFooter(`<:staff:835643948151996446> **|** Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
    .setImage(rand)
    .setDescription(motivo)

    membro.send(embed) 
    message.channel.send(`<:bravinha:841126251741970452> **${message.author}** | Aviso enviado com sucesso!, ninguém mandou quebrar as regras!!`)
}
