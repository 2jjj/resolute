const Discord = require("discord.js");
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

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
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const user = message.mentions.users.first() || message.author;

        const flags = {
            DISCORD_STAFF: '<:DiscordStaff:865600341718466570>',
	          DISCORD_EMPLOYEE: 'Discord Employee',
	          DISCORD_PARTNER: '<:Partner:865598375251410984>',
	          BUGHUNTER_LEVEL_1: '<:BugHunter1:865597855505711194>',
	          BUGHUNTER_LEVEL_2: '<:BugHunter2:865598109177348146>',
	          HYPESQUAD_EVENTS: '<:HypeSquad:865596357125341204>',
	          HOUSE_BRAVERY: '<:Bravery:865597545741156372>',
	          HOUSE_BRILLIANCE: '<:Brilliance:865597355003871252>',
	          HOUSE_BALANCE: '<:Balance:865597097016557619>',
	          EARLY_SUPPORTER: '<:EarlySupporter:865598696513863700>',
	          TEAM_USER: 'Team User',
	          SYSTEM: 'System',
	          VERIFIED_DEVELOPER: '<:early_developer_badge:865598697189539880>'
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
            .setFooter(`Userinfo`, message.client.user.avatarURL({ dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField('Usuário:', `<@${member.user.id}>`)
            .addField('ID:', `${message.author.id}`, true)
            .addField('Entrou em',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
            .addField('Conta criada em', member.user.createdAt.toLocaleString(), true)
            .addField('Badges:', `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nenhuma.'}`, true)
            .addField(`\nCargos [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]:`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Sem cargos."}`)
            //.addField("\nAcknowledgements:", `${acknowledgements}`)
            .addField("\nPermissoes:", `${permissions.join(` **|** `)}`, true);
            
        message.inlineReply(embed);
	}
}