const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: "mendigar",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Mendigar",
    category: "economia",
    usage: "",

    async run (client, message, args) {


    let user = message.author;

    let timeout = 180000;
    let amount = 400;

    let beg = await db.fetch(`pedir_${message.guild.id}_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
        let time = ms(timeout - (Date.now() - beg));
    
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#ff58c3")
        .setTitle(`${message.author.username} está mendigando!`)
        .setDescription(`<:interrogacao:856894534029541376> **|** Você já mendigou recentemente\n<:interrogacao:856894534029541376> **|** Volte em ${time.minutes}m ${time.seconds}s `)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(timeEmbed)
    } else {
    let moneyEmbed = new Discord.MessageEmbed()
        .setColor("#ff58c3")
        .setTitle(`${message.author.username} está mendigando!`)
        .setDescription(`**<:ybs_dinheiro:856961057204600833> **|** Você mendigou e consegui ${amount}¥ ienes.**`)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(moneyEmbed)
    db.add(`ienes_${message.guild.id}_${user.id}`, amount)
    db.set(`pedir_${message.guild.id}_${user.id}`, Date.now())
    }    
}}