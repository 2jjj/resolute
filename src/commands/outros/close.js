const db = require("quick.db")

exports.run = async (client, message, args) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
        
        message.delete();

        if(message.channel.name !== `${message.author.id}`) return message.channel.send(`<:check_no:844591218545524788> | ${message.author} Você pode utilizar este comando apenas para fechar o seu ticket.`).then(msg => msg.delete({timeout:15000}));
        
        message.channel.delete()
    }
