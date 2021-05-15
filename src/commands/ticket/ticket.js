const { Client, Message } = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

        message.delete()

        const spray = message.guild.channels.cache.find(ch => ch.name === `${message.author.id}`);

        if (spray) return message.channel.send(`:x: | ${message.author} Seu ticket atual já está aberto em: ${spray}!`).then(msg => msg.delete({timeout: 15000}));

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
            message.channel.send(`✅ | ${message.author} Ticket criado com sucesso: ${channel}`).then(msg => msg.delete({timeout: 15000}));
            channel.send(`👋 | Olá ${message.author}, este é o seu ticket! 
👋 | Caso queira fechar seu ticket, utilize **${prefix}close**.`)
        })
    }