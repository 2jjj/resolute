const Discord = require("discord.js")

module.exports = {
    name: "unlock",
    aliases: ['desbloquear'],
    cooldown: 1000 * 2, 
    description: "Desbloquear um canal.",
    category: "mod",
    usage: "",
  
    async run (client, message, args) {

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`Você não possui a permissão de \`GERENCIAR CANAIS\``);

    if(!db.fetch(`lock.${message.channel.id}`)) return message.reply(`<a:SETA:852194614927818812> Este canal não está bloqueado.`)

    let msg = await message.channel.send(`:tada: **|** ${message.author} Canal desbloqueado com sucesso! Use ${prefix}}unlock para travar o canal!`)

    try {
        db.delete(`lock.${message.channel.id}`)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:true,
            ADD_REACTIONS:true
        })
        msg.edit("» Este canal foi desbloqueado")

    }catch(e){
        message.channel.send(e)
    }
}
}