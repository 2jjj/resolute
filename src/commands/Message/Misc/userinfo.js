const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "userinfo",
    aliases: ['ui'],
    cooldown: 1000 * 2,
    description: "Obtenha informações de um usuário.",
    category: "misc",
    usage: "<id/@user>",
    example: "@Spray#7725",
    permissoes: [],
    args: false,

    async run(client, message, args) {
        var permissions = [];
        var acknowledgements = 'None';
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const user = message.mentions.users.first() || message.author;

        const flags = {
            DISCORD_STAFF: '<:BadgeDiscordStaff:869961802409209877>',
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: '<:5270blurplepartner:856520144628744213>',
            BUGHUNTER_LEVEL_1: '<:BadgeDiscordBugHunter:853786346498031627>',
            BUGHUNTER_LEVEL_2: '<:BadgeDiscordBugHunterGold:853786346871193600>',
            HYPESQUAD_EVENTS: '<:HypeSquadEvents:869962392078020698>',
            HOUSE_BRAVERY: '<:BadgeHypeSquadBravery:869962263870705674>',
            HOUSE_BRILLIANCE: '<:1350discordbrillance:856520144762175498>',
            HOUSE_BALANCE: '<:BadgeHypeSquadBalance:869962147805921361>',
            EARLY_SUPPORTER: '<:early_developer_badge:854716150076538901>',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_DEVELOPER: '<:early_developer_badge:854716150076538901>'
        };

        const userFlags = user.flags.toArray();

        if (member.permissions.has("KICK_MEMBERS")) {
            permissions.push("Expulsar membros");
        }

        if (member.permissions.has("BAN_MEMBERS")) {
            permissions.push("Banir membros");
        }

        if (member.permissions.has("ADMINISTRATOR")) {
            permissions.push("Administrador");
        }

        if (member.permissions.has("MANAGE_MESSAGES")) {
            permissions.push("Gerenciar Mensagens");
        }

        if (member.permissions.has("MANAGE_CHANNELS")) {
            permissions.push("Gerenciar Canais");
        }

        if (member.permissions.has("MENTION_EVERYONE")) {
            permissions.push("Mencionar everyone");
        }

        if (member.permissions.has("MANAGE_NICKNAMES")) {
            permissions.push("Gerenciar apelidos");
        }

        if (member.permissions.has("MANAGE_ROLES")) {
            permissions.push("Gerenciar cargos");
        }

        if (member.permissions.has("MANAGE_WEBHOOKS")) {
            permissions.push("Gerenciar Webhooks");
        }

        if (member.permissions.has("MANAGE_EMOJIS")) {
            permissions.push("Gerenciar Emojis");
        }

        if (permissions.length == 0) {
            permissions.push("Nenhuma permissão encontrada");
        }

        if (member.user.id == message.guild.ownerID) {
            acknowledgements = 'Dono do servidor';
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('#2F3136')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField('<:users:869960470986113085> **|** Usuário:', `<@${member.user.id}>`)
            .addField('<:IDDD:875166854325342268> **|** ID:', `${message.author.id}`, true)
            .addField('<:calendario:876819338802376735> **|** Entrou em', `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
            .addField('<:calendario:876819338802376735> **|** Conta criada em', member.user.createdAt.toLocaleString(), true)
            .addField('Badges:', `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nenhuma.'}`, true)
            .addField(`\n<:papel:875166854849658910> **|** Cargos [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]:`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Sem cargos."}`)
            //.addField("\nAcknowledgements:", `${acknowledgements}`)
            .addField("\n<:settings:869961070423461941> **|** Permissoes:", `${permissions.join(` **|** `)}`, true)
            .setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }));
        message.reply({ embeds: [embed] });
    }
}