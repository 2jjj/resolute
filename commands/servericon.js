const Discord = require("discord.js")
exports.run = async(client, message, args,)=> {

let simg = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png?size=2048`
        let icone = new Discord.MessageEmbed()
        .setDescription("**Icone do servidor:**")
        .setImage(simg)
        message.channel.send(icone)
}