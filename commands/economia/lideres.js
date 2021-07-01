const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "lideres",
    aliases: ['leaderboard'],
    cooldown: 1000 * 2,
    description: "Lideres de dinheiro.",
    category: "economia",
    usage: "",
    example: "lideres",

    async run(client, message, args) {

        let money = db.all().filter(data => data.ID.startsWith(`money_${message.guild.id}`)).sort((a, b) => b.data - a.data);
        let money1;

        if (money.length > 10) {
            money1 = 10
        } else {
            money1 = money.length
        }

        let content = "";

        for (let i = 0; i < money1; i++) {
            let user = client.users.cache.get(money[i].ID.split('_')[2]).tag;

            content += `${i+1}º **\`${user}\`** - **\`${money[i].data}\` Coins**\n`
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`Rank - ${message.guild.name}`)
            .setDescription(content)
            .setColor('RANDOM')
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setThumbnail(`${message.guild.iconURL({dynamic: true})}`)
            .setTimestamp();

        message.channel.send(`${message.author}`, embed);
    }
}