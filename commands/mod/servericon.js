const Discord = require("discord.js")

module.exports = {
    name: "servericon",
    aliases: ['serveravatar'],
    cooldown: 1000 * 2, 
    description: "icone do servidor.",
    category: "mod",
    usage: "",

    async run (client, message, args) {

        let icone = new Discord.MessageEmbed()
        .setDescription(`**Clique [aqui](${message.guild.iconURL()}) para baixar o ícone do servidor!**`)
        .setImage(message.guild.iconURL({ dynamic: true, size: 2048 })) 
        message.channel.send(icone)
}
}