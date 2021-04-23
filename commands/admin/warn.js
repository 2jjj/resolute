const Discord = require("discord.js");

exports.run = (bot, message, args) => {

    // Aqui é para definir a permissão de cargo para o uso do comando.
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sem permissão!")

    // Aqui o bot menciona o usuário para  que ele mencione um membro para punir.
    let membro = message.mentions.users.first()
    if (!membro) return message.reply("mencione um membro!")

    // Aqui o bot puxa a segunda mensagem do usuário, se nada for escrito, o bot pede para dar um motivo.
    let motivo = args.slice(1).join(" ");
    if (!motivo) return message.reply("escreva um motivo!")

    // Aqui é a embed que aparece no privado do usuário que foi punido.
    let embed = new Discord.MessageEmbed()
    .setTitle(`WARN - ${membro.username}`)
    .setColor('RANDOM')
    .setFooter(`Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
    .setDescription(motivo)

    // Aqui envia a mensagem no privado da pessoa que foi punida.
    membro.send(embed)

    // Aqui mostra no chat a mensagem para o usuário que executou o comando.
    message.channel.send(`**:wink: - aviso enviado com sucesso!**`)
}

exports.help = {
    name: 'warn',
    aliases: ['aviso', "avisar"]
}