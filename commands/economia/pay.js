const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
    let user = message.mentions.members.first() 

    let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

    let embed1 = new Discord.MessageEmbed()
    .setColor("#008000")
    .setDescription(`<:info:835206734225473546> **»** Mencione alguem para pagar!`);

    if (!user) {
        return message.channel.send(`${message.author}`, embed1)
    }
    let embed2 = new Discord.MessageEmbed()
    .setColor("#008000")
    .setDescription(`<:info:835206734225473546> **»** Coloque o valor do pagamento!`);
  
    if (!args[1]) {
        return message.channel.send(`${message.author}`, embed2)
    }
    let embed4 = new Discord.MessageEmbed()
    .setColor("#008000")
    .setDescription(`<:info:835206734225473546> **»**Você não Dinheiro suficiente para realizar o pagamento!`);

    if (member < args[1]) {
        return message.channel.send(`${message.author}`, embed4)
    }
    let embed5 = new Discord.MessageEmbed()
    .setColor("#008000")
    .setDescription(`<:info:835206734225473546> **»** Você tem que colocar um valor maior que **0** para realizar o pagamento!`);

    if(args[1] < 0) {
        return message.channel.send(`${message.author}`, embed5)
    }
    let embed7 = new Discord.MessageEmbed()
    .setColor("#008000")
    .setDescription(`<:info:835206734225473546> **»** Você tem que colocar um valor numerico para realizar o pagamento!`);

    if (isNaN(args[1])){
        return message.channel.send(`${message.author}`, embed7)
    }
    let embed6 = new Discord.MessageEmbed()
    .setTitle("<a:money:838087280052535346> **|** Pagamento")
    .setColor("#008000")
    .setDescription(`<a:money:838087280052535346> Você pagou o ${user} com **R$${args[1]}**!`);

    message.channel.send(`${message.author}`, embed6)
    db.add(`money_${message.guild.id}_${user.id}`, args[1])
    db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
}   