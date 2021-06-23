const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "tempmute",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Mutar alguém temporariamente.",
    category: "mod",
    usage: "@user <temp>",

    async run (client, message, args) {

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<:x_:856894534071746600> **|** Você não possui permissões para usar esse comando.')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]

        if(!Member) {
            const help = new Discord.MessageEmbed()
            .setTitle("Comando de tempmute")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription("Silencie um usuário temporariamente")
            .addField(`Forma de Utilização:`, `<:pontin:852197383974551582> \`${prefix}tempmute @usuario <tempo(ms)>\``)
            .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setTimestamp();
            return message.channel.send(help);
        }

        if(!time) return message.channel.send('<:x_:856894534071746600> **|** Por favor especifique o tempo.')
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
                message.channel.send('<:v_:856894534184468480> **|** Cargo de mute foi criado com sucesso!')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`O membro ${Member.displayName} já está silenciado!`)
        await Member.roles.add(role2)
        message.channel.send(`<:v_:856894534184468480> **|** ${Member.displayName} está silenciado.`)

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(`<:v_:856894534184468480> **|** O membro ${Member.displayName} agora não está mais silenciado.`)
        }, ms(time))
    }
}