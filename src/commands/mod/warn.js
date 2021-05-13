const Discord = require("discord.js");

exports.run = (bot, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
    

    // Aqui é para definir a permissão de cargo para o uso do comando.
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("<:info:835206734225473546> » Sem permissão!")

    // Aqui o bot menciona o usuário para  que ele mencione um membro para punir.
    let membro = message.mentions.users.first()
    if (!membro) return message.reply("<:info:835206734225473546> » Mencione um membro!")

    // Aqui o bot puxa a segunda mensagem do usuário, se nada for escrito, o bot pede para dar um motivo.
    let motivo = args.slice(1).join(" ");
    if (!motivo) return message.reply("<:info:835206734225473546> » Escreva um motivo!")

    // Aqui é a embed que aparece no privado do usuário que foi punido.
    let embed = new Discord.MessageEmbed()
    .setTitle(`WARN - ${membro.username}`)
    .setColor('RANDOM')
    .setFooter(`» Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
    .setDescription(motivo)

    // Aqui envia a mensagem no privado da pessoa que foi punida.
    membro.send(embed)

    // Aqui mostra no chat a mensagem para o usuário que executou o comando.
    message.channel.send(`**<:info:835206734225473546> » Aviso enviado com sucesso!**`)
}

exports.help = {
    name: 'warn',
    aliases: ['aviso', "avisar"]
}