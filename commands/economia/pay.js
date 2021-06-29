const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "pay",
    aliases: ['pagar'],
    cooldown: 1000 * 2,
    description: "Pague para alguém (agiota...)",
    category: "economia",
    usage: "@user <quantidade>",

    async run(client, message, args) {

        let user = message.mentions.members.first()
        let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

        if (!user) return;

        let embed2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Coloque o valor do pagamento!`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        if (!args[1]) {
            return message.channel.send(`${message.author}`, embed2)
        }

        let embed4 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Você não Dinheiro suficiente para realizar o pagamento!`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        if (member < args[1]) {
            return message.channel.send(`${message.author}`, embed4)
        }

        let embed5 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Você tem que colocar um valor maior que **0** para realizar o pagamento!`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        if (args[1] < 0) {
            return message.channel.send(`${message.author}`, embed5)
        }

        let embed7 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Você tem que colocar um valor numerico para realizar o pagamento!`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        if (isNaN(args[1])) {
            return message.channel.send(`${message.author}`, embed7)
        }

        let embed6 = new Discord.MessageEmbed()
            .setTitle("Pagamento")
            .setColor("RANDOM")
            .setDescription(`Você pagou **\`${args[1]}\`** Coins para o ${user}!`)
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        message.channel.send(`${message.author}`, embed6)
        //Adicionando o dinheiro
        db.add(`money_${message.guild.id}_${user.id}`, args[1])
        db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
    }
}