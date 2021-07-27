const config = require("../../../config/config.json")
const { Client, Message, MessageEmbed, Role } = require('discord.js');
const moment = require('moment')

module.exports = {
	name: "serverinfo",
	aliases: ['serverinformation'],
	cooldown: 1000 * 2,
	description: "Obtenha informações de seu servidor",
	category: "util",
	usage: "",
	example: "",
	permissoes: [],
    args: false,
	
	async run(client, message, args) {
		const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };

        const vanityCode = message.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${'vanityCode'}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';
        const members = message.guild.members.cache;
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const embed = new MessageEmbed()
        .setTimestamp()
        .setTitle(`<:5864blurplesearch:856520144817881118> ${message.guild.name}`)
        .setColor('RANDOM')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField(`🎫 Nome:`, message.guild.name, true)
        .addField(`🆔 ID do servidor:`, message.guild.id, true)
        .addField(`👑 Dono do servidor:`, message.guild.owner, true)  
        .addField(`🌎 Região:`, message.guild.region, true)
        .addField(`👥 Membros:`, message.guild.members.cache.size, true)
        .addField(`🤖 Bots`, message.guild.members.cache.filter(member => member.user.bot).size, true)
        .addField(`😗 Emojis:`, message.guild.emojis.cache.size, true)
        .addField(`👻 Emojis animados:`,message.guild.emojis.cache.filter(emoji => emoji.animated).size,true )
        .addField(`💬 Canais de texto:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
        .addField(`🎤 Canais de voz:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
        .addField(`👔 Total de cargos:`, message.guild.roles.cache.size, true)
        .addField(`📅 Criado em`, `${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).format('LTS')} ${moment(message.guild.createdTimestamp).fromNow()},`, true)
        .addField(`🚀 Nivel de boost:`, `${message.guild.premiemTier ? `Tier ${message.guild.premiemTier}` : 'None'}`, true)
        .addField(`💨 Total de boosts:`, `${message.guild.premiemSubscriptionCount || '0'}`, true)
        .addField(`Cargos [${roles.length}]`, roles.length < 15 ? roles.join(', ') : roles.length > 15 ? `${roles.slice(0, 15).join(', ')}\n+${roles.length-15} cargos...` : 'Nenhum cargo!')
        .setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        message.inlineReply(embed);
	}
}