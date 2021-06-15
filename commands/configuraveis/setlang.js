const database = require('../../reconDB');

module.exports = {
    name: "setlang",
    aliases: ['setlinguagem'],
    cooldown: 1000 * 2, 
    description: "Irei trocar de linguagem!",
    category: "config",
    usage: "<lang>",

    async run (client, message, args, msg) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        const lang = args[0];
        if(!lang) message.reply('Please specify a lang.');
        await database.set(`lang-${message.guild.id}`, lang);
        message.channel.send('Language has been set to ' + lang);
    }
}