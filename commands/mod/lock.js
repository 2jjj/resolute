const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "lock",
    aliases: ['bloquear'],
    cooldown: 1000 * 2, 
    description: "bloquear",
    category: "mod",
  
    async run (client, message, args) {

    const embed1 = new Discord.MessageEmbed()
    .setTitle("Sem permissão.")
    .setColor("#ff0000")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .addField(`Você não possui a permissão de`, `GERENCIAR CANAIS`)
    .setFooter("Resolute - By MrSprayX#0012", message.author.displayAvatarURL())
    .setTimestamp();

    const embed2 = new Discord.MessageEmbed()
    .setTitle("Este canal já está bloqueado.")
    .setColor("#ff0000")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .setFooter("Resolute - By MrSprayX#0012", message.author.displayAvatarURL())
    .setTimestamp();

    const embed3 = new Discord.MessageEmbed()
    .setTitle("Resolute")
    .setColor("#ff0000")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .addField(`<:bloqueado:844640110203895829> » Este canal foi bloqueado.`, `Bloqueado por ${message.author}`)
    .setFooter("Resolute - By MrSprayX#0012", message.author.displayAvatarURL())
    .setTimestamp();


    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(embed1);

    if(db.fetch(`lock.${message.channel.id}`)) return message.reply(embed2)

    let msg = await message.channel.send("Sucesso!")

    try {
        db.set(`lock.${message.channel.id}`,message.author.id)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:false,
            ADD_REACTIONS:false
        })
        msg.edit(embed3)

    }catch(e){
        message.channel.send(e)
    }
}
}