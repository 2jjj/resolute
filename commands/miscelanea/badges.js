const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "badges",
    aliases: ['insigneas'],
    cooldown: 1000 * 2, 
    description: "Veja suas insigneas.",
    category: "outros",
    usage: "<emoji_name>",
  
    async run (client, message, args) {

        const user = message.mentions.users.first() || message.author;
        const flags = user.flags.toArray();
        
        message.channel.send(`Insigneas de ${user}: ${flags.join(', ')}`)
    }
}