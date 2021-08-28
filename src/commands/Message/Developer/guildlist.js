const Discord = require('discord.js');
const ownerid = "836345581424738354";

module.exports = {
    name: "guildlist",
    aliases: ['guild'],
    cooldown: 1000 * 2,
    description: "Listar as guilds e os nomes.",
    category: "dev",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {

        if (message.author.id == ownerid) {

            let clientGuilds = message.client.guilds.cache;
            let messageObj = Discord.Util.splitMessage(
                clientGuilds.map(g => '\`' + g.id + `\` **|** \`` + g.name + `\` **|** \`` + g.members.cache.size + '\`') || 'None'
            );
            if (messageObj.length == 1) {
                message.channel.send(messageObj[0]);
            } else {
                for (i = 0; messageObj.length < i; i++) {
                    message.channel.send(messageObj[i]);
                    console.log(messageObj[i]);
                }
            }
            console.log(messageObj[i]);
        } else {
            return;
        }
    }
} 