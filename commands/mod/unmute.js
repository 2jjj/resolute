const { Message } = require('discord.js')
const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "unmute",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Desmutar alguém",
    category: "mod",
    usage: "@user",
  
    async run (client, message, args) {

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) {
            const help = new Discord.MessageEmbed()
            .setTitle("Comando de unmute")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription("Desmute alguém com este comando!")
            .addField(`Forma de Utilização:`, ` \`${prefix}unmute @usuario\``)
            .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp();
            return message.channel.send(help);
        }

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`<:v_:856894534184468480> **|** ${Member.displayName} foi desmutado com sucesso!`)
    }
}