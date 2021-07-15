const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setmoney",
    aliases: ['setdinheiro'],
    cooldown: 1000 * 2,
    description: "Só para admin.",
    category: "economia",
    usage: "@user <quantidade>",
    example: "Spray#7725 1500",
    permissoes: "ADMINISTRATOR",
    args: true,

    async run(client, message, args) {

		if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes)) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes)) return;

        let user = message.mentions.users.first();

        if (!user) return;

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
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();
        message.channel.send(moneyEmbed);
    }
}