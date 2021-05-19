const discord = require('discord.js')
module.exports = { 
    name: "kick",
    description: "kickar alguém",
    run: async(client, message, args) => {
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Você não tem permiçõe suficientes para usar este comando | Permissão necessária:`KICK_MEMBERS`")
        let target = message.mentions.members.first()

        if(!target) return message.reply("Por favor, mencione alguém para kickar!")

        if(target.id === message.author.id) {
            return message.reply("Você não pode se kickar!")
        }

        let reason = args.slice(1).join(' ')

        if(!reason) return message.reply("Por favor, dê um motivo!")

        let embed = new discord.MessageEmbed()
        .setTitle("Resolute - Membro Kickado")
        .setColor('RED')
        .addField("Usuário", `${target.user}`)
        .addField("Moderador", `${message.author}`)
        .addField("Motivo", `${reason}`)
        await message.channel.send(embed)
        await target.kick(reason)
    }
}