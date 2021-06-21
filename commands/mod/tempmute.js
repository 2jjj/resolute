const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name: "tempmute",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Mutar alguém temporariamente.",
    category: "mod",
    usage: "@user <temp>",

    async run (client, message, args) {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.channel.send('<:1926blurplecross:856520144872407060> **|** Eu não encontrei o usuário!')
        if(!time) return message.channel.send('<:1926blurplecross:856520144872407060> **|** Por favor especifique o tempo.')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send('O cargo de mute não está criado, irei criá-lo.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('<:3169blurpleverified:856520145254088714> **|** Cargo de mute foi criado com sucesso!')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`O membro ${Member.displayName} já está silenciado!`)
        await Member.roles.add(role2)
        message.channel.send(`<:3169blurpleverified:856520145254088714> **|** ${Member.displayName} está silenciado.`)

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(`<:1926blurplecross:856520144872407060> **|** ${Member.displayName} agora não está mais silenciado.`)
        }, ms(time))
    }
}