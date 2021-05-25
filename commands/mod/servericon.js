const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "servericon",
    aliases: ['serveravatar'],
    cooldown: 1000 * 2, 
    description: "servericon",
    category: "mod",
  
    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

        let icone = new Discord.MessageEmbed()
        .setDescription(`**Clique [aqui](${message.guild.iconURL()}) para baixar o ícone do servidor!**`)
        .setImage(message.guild.iconURL({ dynamic: true, size: 2048 })) 
        message.channel.send(icone)
}
}