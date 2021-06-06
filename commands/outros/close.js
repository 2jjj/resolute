const db = require("quick.db")

module.exports = {
    name: "close",
    aliases: ['fechar'],
    cooldown: 1000 * 2, 
    description: "Fechar um ticket.",
    category: "outros",
    usage: "",

    async run (client, message, args) {

        console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) { prefix = "s." }
        
        message.delete();

        if(message.channel.name !== `${message.author.id}`) return message.channel.send(`<:1icon_x:846184439403118624> | ${message.author} Você pode utilizar este comando apenas para fechar o seu ticket.`).then(msg => msg.delete({timeout:15000}));
        
        message.channel.delete()
    }
}