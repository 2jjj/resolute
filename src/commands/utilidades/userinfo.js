const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
	name: "userinfo",
	aliases: ['ui'],
	cooldown: 1000 * 2,
	description: "Obtenha informações de um usuário.",
	category: "util",
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
      
        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Expulsar membros");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Banir membros");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrador");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Gerenciar Mensagens");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Gerenciar Canais");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mencionar everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Gerenciar apelidos");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Gerenciar cargos");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Gerenciar Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Gerenciar Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("Nenhuma permissão encontrada");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Dono do servidor';
        }
    
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('#2F3136')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField('<:users:869960470986113085> Usuário:', `<@${member.user.id}>`)
            .addField('🆔 ID:', `${message.author.id}`, true)
            .addField('📅 Entrou em',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
            .addField('📅 Conta criada em', member.user.createdAt.toLocaleString(), true)
            .addField('Badges:', `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nenhuma.'}`, true)
            .addField(`\nCargos [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]:`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Sem cargos."}`)
            //.addField("\nAcknowledgements:", `${acknowledgements}`)
            .addField("\n<:settings:869961070423461941> Permissoes:", `${permissions.join(` **|** `)}`, true)
            .setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        message.inlineReply(embed);
	}
}