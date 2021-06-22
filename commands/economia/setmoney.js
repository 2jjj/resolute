const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setmoney",
    aliases: ['setdinheiro'],
    cooldown: 1000 * 2, 
    description: "Só para admin.",
    //category: "economia",
    usage: "@user <quantidade>",

    async run (client, message, args) {
                
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`Você tem que ter a permissão de **ADMINISTRADOR** para usar esse comando!`);
        };

        let user = message.mentions.users.first();

        if (!user) {
            return message.channel.send(`Você precisa mencionar um usuário para adicionar o Dinheiro!`);
        };

        if (isNaN(args[1])) {
            return message.channel.send(`Você precisa colocar um numero valido!`);
        };

        db.add(`money_${message.guild.id}_${user.id}`, args[1]);
        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

        let moneyEmbed = new Discord.MessageEmbed()
        .setTitle("Coins adicionadas!")
        .setColor("RANDOM")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`Foi adicionado **\`${args[1]}\`** Coins para ${user}!\n\nCoins Atuais: **\`${bal}\`**`)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        message.channel.send(moneyEmbed);
}}