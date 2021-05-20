const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client,message,args)=> {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const embed1 = new Discord.MessageEmbed()
    .setTitle("Sem permissão.")
    .setColor("#ff0000")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .addField(`Você não possui a permissão de`, `GERENCIAR CANAIS`)
    .setFooter("Resolute - By MrSprayX#0012", message.author.displayAvatarURL())
    .setTimestamp();

    const embed2 = new Discord.MessageEmbed()
    .setTitle("Este canal não está bloqueado.")
    .setColor("#ff0000")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .setFooter("Resolute - By MrSprayX#0012", message.author.displayAvatarURL())
    .setTimestamp();

    const embed3 = new Discord.MessageEmbed()
    .setTitle("Resolute")
    .setColor("#ff0000")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .addField(`<:spr4y:844590851769499708> » Este canal foi desbloqueado.`, `Desbloqueado por ${message.author}`)
    .setFooter("Resolute - By MrSprayX#0012", message.author.displayAvatarURL())
    .setTimestamp();


    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(embed1);

    if(!db.fetch(`lock.${message.channel.id}`)) return message.reply(embed2)

    let msg = await message.channel.send('Sucesso!')

    try {
        db.delete(`lock.${message.channel.id}`)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:true,
            ADD_REACTIONS:true
        })
        msg.edit(embed3)

    }catch(e){
        message.channel.send(e)
    }
}
