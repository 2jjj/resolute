const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "atm",
    aliases: [],
    cooldown: 1000 * 2,
    description: "ATM o comando que mostra seu dinheiro(e o dos outros também)!",
    category: "economia",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {

        let user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

        let money = db.fetch(`money_${user.id}`)
        if (money === null) money = 0;

        let bank = db.fetch(`bank_${user.id}`)
        if (bank === null) bank = 0;

        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`\`Informações de ${user.username}:\`` +
                `\n\n<:ybs_dinheiro:856961057204600833> **| Coins:** **\`${money}\`**` +
                `\n:bank: **| Banco:** **\`${bank}\`**` +
                `\n📝 **| Empresas:** **\`test\`**` +
                `\n🔍 **| Badges:** **\`test\`**` +
                `\n🔒 **| Trabalho:** **\`test\`**`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        message.inlineReply(embed);
    }
}