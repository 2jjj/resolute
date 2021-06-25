const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "kick",
    aliases: ['expulsar'],
    cooldown: 1000 * 2, 
    description: "Expulsar uma pessoa do seu servidor",
    category: "mod",
    usage: "@user",

    async run (client, message, args) {
    
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

    const embed = new Discord.MessageEmbed()
        .setTitle("Sem permissão.")
        .setColor("#ff0000")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .addField(`Você não possui a permissão de`, `**KICK_MEMBERS**`)
        .setFooter("Resolute", message.author.displayAvatarURL())
        .setTimestamp();


      if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(embed)
        let target = message.mentions.members.first()

        if(!target) {
            let prefix = db.get(`prefix_${message.guild.id}`)
            if (prefix === null) { prefix = "s." }
            
            const help = new Discord.MessageEmbed()
            .setTitle("Comando de kick")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription("Expulse algum usuário de seu servidor!")
            .addField(`Forma de Utilização:`, ` \`${prefix}kick @usuario <motivo>\``)
            .addField(`Exemplo:`, `  \`${prefix}kick @Spray#0007 Ofensa a staff\``)
            .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setImage(rand)
            .setTimestamp();
            return message.channel.send(help);
        }

        if(target.id === message.author.id) {
            return message.reply("<:x_:856894534071746600> **|** Você não pode se expulsar!")
        }

        let reason = args.slice(1).join(' ')

        if(!reason) return message.reply("<:x_:856894534071746600> **|** Você precisa escrever o motivo!")

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