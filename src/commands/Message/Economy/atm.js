const Discord = require("discord.js");
const db = require("quick.db");
const { flags } = require("../../../util/Emojis")

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

        let user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author || message.member;

        let money = db.fetch(`money_${user.id}`)
        if (money === null) money = 0;

        let bank = db.fetch(`bank_${user.id}`)
        if (bank === null) bank = 0;

        let badges = db.fetch(`badges_${user.id}`);
        if (badges == null) badges = "Nada";
        
        const userFlags = user.flags.toArray();

        db.push(`badges_${user.id}`, `${userFlags.length ? userFlags.map(flag => flags[flag]) : ''}`)

        if(user.id == "836345581424738354") {
            db.push(`badges_${user.id}`, `<:early_developer_badge:854716150076538901>`)
            db.push(`badges_${user.id}`, `<:HypeSquadEvents:869962392078020698>`)
            db.push(`badges_${user.id}`, `<:BadgeDiscordStaff:869961802409209877>`)
        }

        const obj_badges = {}

        try {
            badges.map(x => {
                if (!obj_badges[x]) obj_badges[x] = 0;
                ++obj_badges[x];
            })
        } catch (e) {
            var b = 4;
        }

        let str_badges = '';
        for (const x in obj_badges) {
            str_badges += x + " "
        }

        if(b === 4) {
            str_badges += `\`Você não possui nenhuma badge.\``
        }

        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`\`Informações de ${user.username}:\`` +
                `\n\n🔍 **| Badges:** ${str_badges}` +
                `\n<:ybs_dinheiro:856961057204600833> **| Coins:** **\`${money}\`**` +
                `\n:bank: **| Banco:** **\`${bank}\`**` +
                `\n📝 **| Empresas:** **\`2\`**` +
                `\n🔒 **| Trabalho:** **\`Programador\`**`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
}