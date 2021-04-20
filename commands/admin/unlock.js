const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;

    if(!db.fetch(`lock.${message.channel.id}`)) return message.reply("Esse canal não está bloqueado.")

    let msg = await message.channel.send("Desbloqueando....")

    try {
        db.delete(`lock.${message.channel.id}`)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:true,
            ADD_REACTIONS:true
        })
        msg.edit("<a:spr4y:833819662894628884> Canal desbloqueado.")

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
    name:"unlock",
    description:"Empty",
    usage:"embed",
    category:"moderation"
}