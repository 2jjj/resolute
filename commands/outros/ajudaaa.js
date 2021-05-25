const Discord = require('discord.js');
module.exports = {
    name: "help",
    aliases: ['ajuda'],
    cooldown: 1000 * 2, 
    category: "outros",
    async run (client, message, args) {
        
        let botCommands = client.commands.filter((cmd) => cmd.category === 'bot');
        //let funCommands = client.commands.filter((cmd) => cmd.category === 'fun');

        console.log(botCommands, botCommands.size)

        //.addField(`outros [${botCommands.size}]:`, botCommands.map(cmd => cmd.name).join(' | '))
        //.addField(`FUN [${funCommands.size}]:`, funCommands.map(cmd => cmd.name).join(' | '))
    }
}