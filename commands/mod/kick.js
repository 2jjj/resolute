const Discord = require('discord.js')

module.exports = {
    name: "kick",
    aliases: ['expulsar'],
    cooldown: 1000 * 2, 
    description: "Expulsar uma pessoa do seu servidor",
    category: "mod",
    usage: "@user",

    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }

    const embed = new Discord.MessageEmbed()
        .setTitle("Sem permissão.")
        .setColor("#ff0000")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .addField(`Você não possui a permissão de`, `KICK_MEMBERS`)
        .setFooter("Resolute", message.author.displayAvatarURL())
        .setTimestamp();


      if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(embed)
        let target = message.mentions.members.first()

        if(!target) return message.reply("<:ybs_mencao:851954512540991490> **|** Por favor, mencione alguém para kickar!")

        if(target.id === message.author.id) {
            return message.reply("<:ybs_duvida:851954411348820018> **|** Você não pode se kickar!")
        }

        let reason = args.slice(1).join(' ')

        if(!reason) return message.reply("<:ybs_duvida:851954411348820018> **|** Por favor, dê um motivo!")

        let embed2 = new Discord.MessageEmbed()
        .setTitle(`O membro ${target.user} foi expulso!`)
        .setColor('RED')
        .addField("Usuário", `${target.user}`)
        .addField("Moderador", `${message.author}`)
        .addField("Motivo", `${reason}`)
        await message.channel.send(embed2)
        await target.kick(reason)
    }
}