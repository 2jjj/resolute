const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "saque",
    aliases: ['sacar'],
    cooldown: 1000 * 2,
    description: "Saque dinheiro do banco!",
    category: "economia",
    usage: "<quantidade>",
    example: "1000",
    permissoes: [],
    args: true,

    async run(client, message, args) {

        let member = db.fetch(`bank_${message.author.id}`);

        if (!args[0]) return;

        let embed4 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Você não tem Coins no banco o suficiente para realizar o saque!`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        if (member < args[0]) {
            return message.inlineReply(`${message.author}`, embed4);
        };

        let embed5 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Você tem que colocar um valor maior que **0** para realizar o saque!`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        if (args[0] < 0) {
            return message.inlineReply(`${message.author}`, embed5);
        };

        let embed7 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Você tem que colocar um valor numerico para realizar o saque!`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        if (isNaN(args[0])) {
            return message.inlineReply(`${message.author}`, embed7);
        };

        let embed6 = new Discord.MessageEmbed()
            .setTitle("🏦 **|** Saque realizado!")
            .setColor("RANDOM")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription(`<:ybs_dinheiro:856961057204600833> Você sacou o total de **\`R$${args[0]}\`** Coins!`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        message.inlineReply(`${message.author}`, embed6);

        db.add(`money_${message.author.id}`, args[0]);
        db.subtract(`bank_${message.author.id}`, args[0]);
    }
}