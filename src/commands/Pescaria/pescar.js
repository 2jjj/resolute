const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
    name: "pescar",
    aliases: [""],
    cooldown: 1000 * 2,
    description: "",
    category: "",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args, cmduser, text, prefix, player) {

        let user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author || message.member;

        let varinhas = db.fetch(`varinhas_${user.id}`)
        if (varinhas === null) varinhas = 0;

        if (varinhas < 1) {
            const embed = new Discord.MessageEmbed()
                .setTitle("a");

            message.channel.send(embed)
        }
    }
}