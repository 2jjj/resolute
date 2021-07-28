const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const GuildSettings = require("../../database/mongoDB/settings");

module.exports = {
    name: "daily",
    aliases: ['diaria'],
    cooldown: 1000 * 2,
    description: "Resgate seu daily e ganhe uma quantidade determinada de coins!",
    category: "economia",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {

        
		var storedSettings = await GuildSettings.findOne({
			gid: message.guild.id
		});
		if (!storedSettings) {
			const newSettings = new GuildSettings({
				gid: message.guild.id
			});
			await newSettings.save().catch(() => {});
			storedSettings = await GuildSettings.findOne({
				gid: message.guild.id
			});
		}
		if(!storedSettings.prefix){
			storedSettings.prefix = "s."
		}


        let user = message.author;
        let timeout = 86400000;
        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);
        let amount = Math.floor(Math.random() * 10000) + 1000;

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`<:ybs_dinheiro:856961057204600833> **|** Você já recebeu sua recompensa diária!\n<:interrogacao:856894534029541376> **|** Colete novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
                .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setThumbnail(`${message.guild.iconURL({dynamic: true})}`)
                .setTimestamp();
            message.channel.send(`${user}`, timeEmbed);
        } else {
            let moneyEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`<:ybs_dinheiro:856961057204600833> **|** Você recebeu **\`${amount}\`** Coins!\n<:pontin:852197383974551582> **|** Compre itens com ${storedSettings.prefix}shop!`)
                .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                .setTimestamp();
            message.channel.send(`${user}`, moneyEmbed);

            db.add(`money_${user.id}`, amount);
            db.set(`daily_${user.id}`, Date.now());
        }
    }
}