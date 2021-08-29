const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "lideres",
    aliases: ['leaderboard'],
    cooldown: 1000 * 2,
    description: "Lideres",
    category: "economia",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {

        let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
        if (!money.length) {
            let noEmbed = new Discord.MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setColor("#ff58c3")
                .setFooter("Ninguém")
            return message.reply({ embeds: [noEmbed] })
        };

        money.length = 20;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            let user = client.users.cache.get(money[i].ID.split('_')[2])
            finalLb += `<:setaaa:860626769089265665> **${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : `${user}`}** - **${money[i].data} RCoins**\n`;
        };
        let bal = db.fetch(`money_${message.author.id}`)
        if (bal === null) bal = '0'
        const embed = new Discord.MessageEmbed()
            .setTitle(`<:ybs_status:856961057083621377> **|** Rank Global - Top 20 pessoas com mais RCoins`)
            .setColor("#ff58c3")
            .setDescription(finalLb)
            .setFooter(`Seu dinheiro » ${bal}RCoins!`, client.user.displayAvatarURL())
            .setTimestamp()
        message.inlineReply(embed);

    }
}