const db = require("quick.db")

module.exports = {
    name: "close",
    aliases: ['fechar'],
    cooldown: 1000 * 2, 
    description: "sortear",
    category: "outros",

    async run (client, message, args) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
        
        message.delete();

        if(message.channel.name !== `${message.author.id}`) return message.channel.send(`<:check_no:844591218545524788> | ${message.author} Você pode utilizar este comando apenas para fechar o seu ticket.`).then(msg => msg.delete({timeout:15000}));
        
        message.channel.delete()
    }
}