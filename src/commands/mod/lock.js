const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client,message,args)=> {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("<:2637settings:843854352867262504> | Você não possui permissões para usar este comando | `MANAGE_CHANNELS`");

    if(db.fetch(`lock.${message.channel.id}`)) return message.reply("<:7300lock:843854352653484084> | Este canal já está bloqueado.")

    let msg = await message.channel.send("<:7300lock:843854352653484084> » Aguarde um momento...")

    try {
        db.set(`lock.${message.channel.id}`,message.author.id)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:false,
            ADD_REACTIONS:false
        })
        msg.edit("<:7300lock:843854352653484084> Canal bloqueado.")

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