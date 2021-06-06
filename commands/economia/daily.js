const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: "daily",
    aliases: ['diaria'],
    cooldown: 1000 * 2, 
    description: "Resgate seu daily.",
    category: "economia",
    usage: "",

    async run (client, message, args) {
    
        console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)
    
        let user = message.author;

        let timeout = 86400000;

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);
        
        let amount = Math.floor(Math.random() * 10000) + 1000;
        
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
    
            let timeEmbed = new Discord.MessageEmbed()
            .setColor("#008000")
            .setDescription(`<:info:835206734225473546> **»** Você já recebeu sua recompensa diária!\n\nColete novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
                
            message.channel.send(`${user}`, timeEmbed);

        } else {
            let time = ms(timeout - (Date.now() - daily));

            let moneyEmbed = new Discord.MessageEmbed()
            .setTitle("Você recebeu sua recompensa diária!")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription(`Você recebeu **\`R$${amount}\`** RCoins`)
            .addField(`<:information:843590035848429579> Aviso`, `<:y_pontinho:843648515695444019> \`Você só pode resgatar sua próxima recompensa daqui a ${time.hours}h ${time.minutes}m ${time.seconds}s\``)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp();        
            message.channel.send(`${user}`, moneyEmbed);
            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
        }
    }
}