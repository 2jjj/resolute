const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client,message,args)=> {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Você não possui permissões para usar este comando | `MANAGE_CHANNELS`");

    if(db.fetch(`lock.${message.channel.id}`)) return message.reply("Este canal já está bloqueado.")

    let msg = await message.channel.send("Carregando...")

    try {
        db.set(`lock.${message.channel.id}`,message.author.id)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:false,
            ADD_REACTIONS:false
        })
        msg.edit("<a:spray:833804244342931486> Canal bloqueado.")

    }catch(e){
        message.channel.send(e)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}

exports.help = {
    name:"lock",
    description:"Empty",
    usage:"embed",
    category:"moderation"
}