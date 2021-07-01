const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "money",
    aliases: ['dinheiro', 'atm'],
    cooldown: 1000 * 2,
    description: "Informações do seu dinheiro.",
    category: "economia",
    usage: "",
    example: "money",

    async run(client, message, args) {

        let user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

        let money = db.fetch(`money_${message.guild.id}_${user.id}`)
        if (money === null) money = 0;

        let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)
        if (bank === null) bank = 0;

        let ienes = await db.fetch(`ienes_${message.guild.id}_${user.id}`)
        if (ienes === null) ienes = 0;

        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Balanço Monetário")
            .setDescription(`**${user.username}**, veja as informações da sua carteira:` +
                `\n\n<:ybs_dinheiro:856961057204600833> **| Coins:** **\`${money}\`**` +
                `\n<:ybs_dinheiro:856961057204600833> **| ¥ Ienes:** **\`${ienes}\`**` +
                `\n:bank: **| Banco:** **\`${bank}\`**`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        message.channel.send(`${user}`, embed);
    }
}