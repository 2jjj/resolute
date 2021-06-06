const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "saque",
    aliases: ['sacar'],
    cooldown: 1000 * 2, 
    description: "Saque dinheiro do banco!",
    category: "economia",
    usage: "<quantidade>",

    async run (client, message, args) {

    console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)

    let member = db.fetch(`bank_${message.guild.id}_${message.author.id}`);

    let embed2 = new Discord.MessageEmbed()
    .setColor("#008000")
    .setDescription(`> **»** Coloque o valor do saque!`);
  
    if (!args[0]) {
        return message.channel.send(`${message.author}`, embed2);
    };
    let embed4 = new Discord.MessageEmbed()
    .setColor("#008000")
    .setDescription(`> **»** Você não Dinheiro no Banco o suficiente para realizar o saque!`);

    if (member < args[0]) {
        return message.channel.send(`${message.author}`, embed4);
    };
    let embed5 = new Discord.MessageEmbed()
    .setColor("#008000")
    .setDescription(`> **»** Você tem que colocar um valor maior que **0** para realizar o saque!`);

    if(args[0] < 0) {
        return message.channel.send(`${message.author}`, embed5);
    };
    let embed7 = new Discord.MessageEmbed()
    .setColor("#008000")
    .setDescription(`> **»** Você tem que colocar um valor numerico para realizar o saque!`);

    if (isNaN(args[0])){
        return message.channel.send(`${message.author}`, embed7);
    };
    let embed6 = new Discord.MessageEmbed()
    .setTitle("🏦 **|** Saque")
    .setColor("#008000")
    .setDescription(`💵 Você sacou no **Banco** um valor de **R$${args[0]}**!`);

    message.channel.send(`${message.author}`, embed6);
    db.add(`money_${message.guild.id}_${message.author.id}`, args[0]);
    db.subtract(`bank_${message.guild.id}_${message.author.id}`, args[0]);
}}