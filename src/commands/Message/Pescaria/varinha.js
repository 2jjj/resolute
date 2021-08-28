const db = require("quick.db");
const Discord = require("discord.js");
const ee = require(`../../../config/embed.json`);

module.exports = {
    name: "varinha",
    aliases: [""],
    cooldown: 1000 * 2,
    description: "",
    category: "pescaria",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {
        
        let user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author || message.member;

        let varinhas = db.fetch(`varinhas_${user.id}`)
        if (varinhas === null) varinhas = 0;

        if (varinhas < 1) {
            const embed = new Discord.MessageEmbed()
                .addField("Você não possui nenhuma varinha de pesca.", "Para comprar uma varinha basta ultilizar s.varinha comprar")
                .setFooter(ee.footertext, ee.footericon)
                .setColor("#1E90FF");
            message.channel.send(embed)
        }
    }
}