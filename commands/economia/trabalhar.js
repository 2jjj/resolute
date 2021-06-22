const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "trabalhar",
    aliases: ['trabalho', 'work'],
    cooldown: 1000 * 2, 
    description: "Trabalhe para ganhar dinheiro!",
    category: "economia",
    usage: "",

    async run (client, message, args) {
        
        let user = message.author;
        
        let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

        let timeout = 600000;
        
        if (author !== null && timeout - (Date.now() - author) > 0) {
            
            let time = ms(timeout - (Date.now() - author));
        
            let timeEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Você já trabalhou recentemente!\n\nTente novamente em **${time.minutes}m ${time.seconds}s**`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp();  

            message.channel.send(`${user}`, timeEmbed);
        } else {

            let replies = ['Programador','Construtor','Agricultor','Garoto(a) de Programa','Garçom','Mecanico','Cozinheiro',
                        'Vendedor','Barqueiro','Youtuber','Padeiro']
    
            let result = Math.floor((Math.random() * replies.length));

            let amount = Math.floor(Math.random() * 5000) + 1;

            let embed1 = new Discord.MessageEmbed()
            .setTitle("💸 **|** Trabalho")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription(`${user.username} trabalhou como **${replies[result]}** e ganhou: \n\n💸 Dinheiro: **R$${amount}**`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp();  
            message.channel.send(`${user}`, embed1);
            
            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`work_${message.guild.id}_${user.id}`, Date.now());
        };
}}