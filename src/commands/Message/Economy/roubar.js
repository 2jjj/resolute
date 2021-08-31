const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: "roubar",
    aliases: ['roubo'],
    cooldown: 1000 * 2,
    description: "Roube alguém!",
    category: "economia",
    usage: "@user",
    example: "Spray#7725",
    permissoes: [],
    args: true,

    async run(client, message, args) {

        let autor = message.author;
        let user = message.mentions.users.first();

        if (!user) return;

        if (user.id == autor.id) {
            return message.reply(`<:x_:856894534071746600> **|** Você não pode se auto-roubar!`);
        };

        let user_money = await db.fetch(`money_${user.id}`)
        if (user_money == null) user_money = 0;

        let autor_money = await db.fetch(`money_${autor.id}`)
        if (autor_money == null) autor_money = 0;

        if (user_money <= 0) {
            return message.reply(`Você não pode roubar alguem que não possui dinheiro!`);
        };

        let timeout = 86400000;

        let daily = await db.fetch(`rob_${autor.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {

            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new Discord.MessageEmbed()
                .setColor("#008000")
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                .setDescription(`Você já realizou um roubo hoje!\n\nColete novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
                .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp();

            message.reply({ embeds: [timeEmbed] });

        } else {

            let sorte = Math.floor(Math.random() * 4) + 1;

            if (sorte == 2) {

                let amount = Math.floor(Math.random() * autor_money) + 1;
                let moneyEmbed = new Discord.MessageEmbed()
                    .setTitle("👮 **|** Preso por Roubo")
                    .setColor("RED")
                    .setDescription(`Você realizou um roubo e não se saiu muito bem!\nVocê perdeu um total de **\`${amount}\`** Coins!`)
                    .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp();
                message.reply({ embeds: [moneyEmbed] });

                db.subtract(`money_${autor.id}`, amount);
                db.set(`rob_${autor.id}`, Date.now());

            } else {

                let amount = Math.floor(Math.random() * user_money) + 1;
                let moneyEmbed = new Discord.MessageEmbed()
                    .setTitle("🔫 **|** Roubo Realizado")
                    .setColor("GREEN")
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                    .setDescription(`Você roubou o ${user} e conseguiu **\`${amount}\`** RCoins!`)
                    .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp();

                message.reply({ embeds: [moneyEmbed] });

                db.subtract(`money_${user.id}`, amount);
                db.add(`money_${autor.id}`, amount);
                db.set(`rob_${autor.id}`, Date.now());
            };
        };
    }
}