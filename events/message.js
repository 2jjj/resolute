const Discord = require('discord.js');
module.exports = {
    name: "message",
    emiter: "on",
    run: (bot, message) => {
        if (message.author.bot || message.channel.type === 'dm') return;
        if (!message.content.startsWith(bot.config.prefix)) return;

        const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);  
        const command = args.shift().toLowerCase();

        let cmd = bot.commands.get(command) || bot.commands.find((c) => c.alias.includes(command));

        if (!cmd) return message.reply('Ese comando no existe.');

        cmd.run(bot, message, args);

    }
}
