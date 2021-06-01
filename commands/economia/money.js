const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "dinheiro",
    aliases: ['money'],
    cooldown: 1000 * 2, 
    description: "dev",
    category: "economia",
  
    async run (client, message, args) {
    
    let user = client.users.cache.get(args[0]) || message.mentions.users.first() ||  message.author;

    let money = db.fetch(`money_${message.guild.id}_${user.id}`)
    if(money === null) money = 0;
  
    let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)
    if(bank === null) bank = 0;

    const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("💸Balanço Monetário")
    .setDescription(`**${user.username}**, veja as informações da sua carteira:` +
    `\n\n💸 > Dinheiro: **R$${money}**` +
    `\n:bank: > Banco: **R$${bank}**`)
    .setFooter("Informações de sua carteira ~")
    .setTimestamp();

    message.channel.send(`${user}`, embed);
}}