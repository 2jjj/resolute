const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client,message,args)=> {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Você não possui permissões para usar este comando | `MANAGE_CHANNELS`");

    if(!db.fetch(`lock.${message.channel.id}`)) return message.reply("<:7300lock:843854352653484084> » Esse canal não está bloqueado.")

    let msg = await message.channel.send("<:7300lock:843854352653484084> » Aguarde um momento...")

    try {
        db.delete(`lock.${message.channel.id}`)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:true,
            ADD_REACTIONS:true
        })
        msg.edit("<:7300lock:843854352653484084> Canal desbloqueado.")

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