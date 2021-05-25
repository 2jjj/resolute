const { Client, Message } = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

        message.delete()

        const spray = message.guild.channels.cache.find(ch => ch.name === `${message.author.id}`);

        if (spray) return message.channel.send(`<:check_no:844591218545524788> ${message.author} Seu ticket atual já está aberto em: ${spray}!`).then(msg => msg.delete({timeout: 15000}));

        message.guild.channels.create(`${message.author.id}`, {
            type : 'text',
            permissionOverwrites : [
                {
                    id : message.guild.id,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : message.author.id,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                }
            ]
        }).then(async channel=> {
            message.channel.send(`🎫 | ${message.author} Seu ticket foi criado com sucesso: ${channel}`).then(msg => msg.delete({timeout: 15000}));
            channel.send(`<:check_yes:844591174916636712> | Olá ${message.author}, este é o seu ticket! 
<:check_no:844591218545524788> | Caso queira fechar seu ticket, utilize **${prefix}close**.`)
        })
    }