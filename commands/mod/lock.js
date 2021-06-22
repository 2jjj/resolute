const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "lock",
    aliases: ['bloquear'],
    cooldown: 1000 * 2, 
    description: "Bloquear o canal",
    category: "mod",
    usage: "",

    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`Você não possui a permissão de \`GERENCIAR CANAIS\``);

    if(db.fetch(`lock.${message.channel.id}`)) return message.reply("<a:SETA:852194614927818812> Este canal já está bloqueado.")

    let msg = await message.channel.send("Sucesso!")

    try {
        db.set(`lock.${message.channel.id}`,message.author.id)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:false,
            ADD_REACTIONS:false
        })
        msg.edit(`:tada: **|** ${message.author} este canal foi bloqueado com sucesso! **|** Use ${prefix}unlock para destravar!`)

    }catch(e){
        message.channel.send(e)
    }
}
}