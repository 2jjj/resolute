const { Message } = require('discord.js')

module.exports = {
    name: "unmute",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Desmutar alguém",
    category: "mod",
    usage: "@user",
  
    async run (client, message, args) {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('<:1926blurplecross:856520144872407060> **|** O usuário que você mencionou não foi encontrado.')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`<:3169blurpleverified:856520145254088714> **|** ${Member.displayName} foi desmutado com sucesso!`)
    }
}