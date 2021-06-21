const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "unlock",
    aliases: ['desbloquear'],
    cooldown: 1000 * 2, 
    description: "Desbloquear o canal bloqueado anteriormente.",
    category: "mod",
    usage: "",
  
    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."    

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`<:1926blurplecross:856520144872407060> **|** Você não possui a permissão de \`GERENCIAR CANAIS\``);

    if(!db.fetch(`lock.${message.channel.id}`)) return message.reply(`<:1926blurplecross:856520144872407060> **|** Este canal não está bloqueado.`)

    let msg = await message.channel.send(`:tada: **|** ${message.author} Canal desbloqueado com sucesso! Use ${prefix}}unlock para travar o canal!`)

    try {
        db.delete(`lock.${message.channel.id}`)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:true,
            ADD_REACTIONS:true
        })
        msg.edit("<:3169blurpleverified:856520145254088714> **|** Este canal foi desbloqueado")

    }catch(e){
        message.channel.send(e)
    }
}
}