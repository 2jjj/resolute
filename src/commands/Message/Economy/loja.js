const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "loja",
    aliases: ['shop'],
    cooldown: 1000 * 2,
    description: "",
    category: "economia",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} - Loja`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Categorias:\n`)


    }
}