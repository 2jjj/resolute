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

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("<:mod:856894534088523776> **|** Sem permissão! | Permissão necessária:ADMINISTRATOR ") 

    let membro = message.mentions.users.first() 
    if (!membro) return message.reply("<:ybs_mencao:851954512540991490> **|** Você precisa mencionar o usuário que quer dar aviso!")

    let motivo = args.slice(1).join(" "); 
    if (!motivo) return message.reply("Escreva um motivo do aviso do usuário!") 

    let embed = new Discord.MessageEmbed()//${membro.username}
    .setTitle(`Você foi avisado!`)
    .setColor('RANDOM')
    .setFooter(`Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
    .setImage(rand)
    .setDescription(`**Motivo: ${motivo}**`)

    membro.send(embed) 
    message.channel.send(`<:v_:856894534184468480> **${message.author}** | Aviso enviado com sucesso!`)
    await db.add(`warnsCount_${message.guild.id}-${membro.id}`, 1)
}
}