const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "badges",
    aliases: ['insigneas'],
    cooldown: 1000 * 2, 
    description: "Badges",
    category: "outros",
    usage: "<emoji_name>",
  
    async run (client, message, args) {

        const user = message.mentions.users.first() || message.author;

        const flags = user.flags.toArray();

        console.log(flags);
        
        message.channel.send(`${user}'s badges: ${flags.join(', ')}`)
    }
}