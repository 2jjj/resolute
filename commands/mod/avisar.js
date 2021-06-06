const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "avisar",
  aliases: ['warn', 'aviso'],
  cooldown: 1000 * 2, 
  description: "Avisar uma pessoa com mensagem na DM",
  category: "mod",
  usage: "@user <motivo>",

async run (client, message, args) {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) { prefix = "s." }
  
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
    if (!membro) return message.reply("> Você precisa mencionar o usuário que quer dar aviso!")

    let motivo = args.slice(1).join(" "); 
    if (!motivo) return message.reply("> Escreva um motivo do aviso do usuário!") 

    let embed = new Discord.MessageEmbed() 
    .setTitle(`Você foi avisado! - ${membro.username}`)
    .setColor('RANDOM')
    .setFooter(`Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
    .setImage(rand)
    .setDescription(`**${motivo}**`)

    membro.send(embed) 
    message.channel.send(`<:bravinha:841126251741970452> **${message.author}** | Aviso enviado com sucesso!, ninguém mandou quebrar as regras!!`)
    await db.add(`warnsCount_${message.guild.id}-${user.id}`, 1)
}
}