const Discord = require("discord.js");

exports.run = (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("<:staff:835643948151996446> **|** Sem permissão!") 

    let membro = message.mentions.users.first() 
    if (!membro) return message.reply("<:staff:835643948151996446> **|** Mencione um membro!")

    let motivo = args.slice(1).join(" "); 
    if (!motivo) return message.reply("<:staff:835643948151996446> **|** Escreva um motivo!") 

    let embed = new Discord.MessageEmbed() 
    .setTitle(`WARN - ${membro.username}`)
    .setColor('RANDOM')
    .setFooter(`<:staff:835643948151996446> **|** Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
    .setDescription(motivo)

    membro.send(embed) 
    message.channel.send(`**${message.author} | <:staff:835643948151996446> **|** Aviso enviado com sucesso!**`) // Aqui vai ser a mensagem que o bot irá mandar no chat para o autor que executou o comando.
}
