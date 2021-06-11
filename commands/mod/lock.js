const Discord = require("discord.js")

module.exports = {
    name: "lock",
    aliases: ['bloquear'],
    cooldown: 1000 * 2, 
    description: "Bloquear um canal.",
    category: "mod",
    usage: "",

    async run (client, message, args) {

    const embed3 = new Discord.MessageEmbed()
    .setTitle("Resolute")
    .setColor("#ff0000")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .addField(`<:bloqueado:844640110203895829> » Este canal foi bloqueado.`, `Bloqueado por ${message.author}`)
    .setFooter("Resolute - By Spray#0007", message.author.displayAvatarURL())
    .setTimestamp();

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`Você não possui a permissão de \`GERENCIAR CANAIS\``);

    if(db.fetch(`lock.${message.channel.id}`)) return message.reply("<a:SETA:852194614927818812> Este canal já está bloqueado.")

    let msg = await message.channel.send("Sucesso!")

    try {
        db.set(`lock.${message.channel.id}`,message.author.id)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:false,
            ADD_REACTIONS:false
        })
        msg.edit(`:tada: **|** @MrSprayX Canal bloqueado com sucesso! Use +unlock para destravar!`)

    }catch(e){
        message.channel.send(e)
    }
}
}