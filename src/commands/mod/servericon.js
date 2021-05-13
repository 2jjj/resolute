 const Discord = require("discord.js")

exports.run = async(bot, message, args,)=> { 

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

        let icone = new Discord.MessageEmbed()
        .setDescription(`**Clique [aqui](${message.guild.iconURL()}) para baixar o ícone do servidor!**`)
        .setImage(message.guild.iconURL({ dynamic: true, size: 2048 })) 
        message.channel.send(icone)
}

exports.help = {
    name: 'servericon',
    aliases: ["icon"]
}