const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "depositar",
    aliases: ['dep'],
    cooldown: 1000 * 2, 
    description: "Deposite seu dinheiro no banco.",
    category: "economia",
    usage: "<quantidade>",

    async run (client, message, args) {
        
        let member = db.fetch(`money_${message.guild.id}_${message.author.id}`);
        if(member == null) member = 0;

        let bank = db.fetch(`bank_${message.guild.id}_${message.author.id}`);
        if(bank == null) bank = 0;

        let embed2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Você precisa colocar o valor do depósito!`)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp(); 

        if (!args[0]) {
            return message.channel.send(`${message.author}`, embed2);
        };
        let embed4 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`<:x_:856894534071746600> **|** Você não dinheiro suficiente para realizar o deposito!`)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp(); 

        if (member < args[0]) {
            return message.channel.send(`${message.author}`, embed4);
        };
        let embed5 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Você tem que colocar um valor maior que 0 para realizar o deposito!`)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();  

        if(args[0] < 0) {
            return message.channel.send(`${message.author}`, embed5);
        };
        let embed6 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Você precisa colocar um valor numérico para realizar o deposito!`)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();  
        
        if (isNaN(args[0])){
            return message.channel.send(`${message.author}`, embed6);
        };
        let embed7 = new Discord.MessageEmbed()
        .setTitle("🏦 | Depósito")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`Você depositou **\`R$${args[0]}\`** Coins!`)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();       
        message.channel.send(`${message.author}`, embed7);
        db.add(`bank_${message.guild.id}_${message.author.id}`, args[0]);
        db.subtract(`money_${message.guild.id}_${message.author.id}`, args[0]);
}}