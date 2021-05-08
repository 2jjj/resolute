const Discord = require("discord.js");

exports.run = (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sem permissão!") // Aqui definimos a permissão para utilizar o comando quem apenas tiver o cargo ADIMINSTRATOR.

    let membro = message.mentions.users.first() // Aqui definimos a váriavel "membros"
    if (!membro) return message.reply("Mencione um membro!") // Aqui caso o autor da mensagem não mencionar uma pessoa, o bot irá avisar.

    let motivo = args.slice(1).join(" "); // Aqui definimos a váriavel "motivo".
    if (!motivo) return message.reply("Escreva um motivo!") // Aqui depois autor da mensagem mencionar uma pessoa e não colocar um motivo, o bot irá avisar.

    let embed = new Discord.MessageEmbed() // Aqui vai ser a embed em que o bot irá mandar no chat.
    .setTitle(`WARN - ${membro.username}`)
    .setColor('RANDOM')
    .setFooter(`Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
    .setDescription(motivo)

    membro.send(embed) // Aqui o bot irá mandar a embed no privado do membro que levou o aviso "warn".
    message.channel.send(`**${message.author} | <:2637settings:837767461138071572> - Aviso enviado com sucesso!**`) // Aqui vai ser a mensagem que o bot irá mandar no chat para o autor que executou o comando.
}

exports.help = {
    name: 'warn',
    aliases: ['aviso']
}