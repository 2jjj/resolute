const Discord = require("discord.js");
const config = require("../../config.json")

module.exports = {
	name: "serverinfo",
	aliases: ['serverinformation'],
	cooldown: 1000 * 2,
	description: "Informações do servidor.",
	category: "mod",
	usage: "",

	async run(client, message, args) {

		let serverembed = new Discord.MessageEmbed()
			.setColor("#6400b6") //»
			.setTitle(`<:5864blurplesearch:856520144817881118> ${message.guild.name}`)
			.setDescription(`
    🧭 **| Nome:** \`${message.guild.name}\`
    🧭 **| ID do servidor:** \`${message.guild.id}\`
    📆 **| Servidor Criado em:** \`${message.guild.createdAt}\`
    <:8263blurplemembers:856520144778952704> **| Membros** \`${message.guild.members.cache.filter(member => member.user.bot).size} Bots | ${(message.guild.memberCount) - (message.guild.members.cache.filter(member => member.user.bot).size)} Membros | ${message.guild.memberCount} Total de Membros | ${Math.round((message.guild.members.cache.filter(member => member.user.bot).size / message.guild.memberCount) * 100)}% Bots | ${Math.round((((message.guild.memberCount) - (message.guild.members.cache.filter(member => member.user.bot).size)) / message.guild.memberCount) * 100)}% Membros}\`
    <:5702blurpletextchannel:856520145042931722> **| Canais:** \`${message.guild.channels.cache.filter(chan => chan.type === 'voice').size} Chats de Voz | ${message.guild.channels.cache.filter(chan => chan.type === 'text').size} Canais de Texto | ${message.guild.channels.cache.filter(chan => chan.type === 'category').size} Categorias | ${Math.round((message.guild.channels.cache.filter(chan => chan.type === 'voice').size / message.guild.channels.cache.size) * 100)}% Chats de Voz | ${Math.round((message.guild.channels.cache.filter(chan => chan.type === 'text').size / message.guild.channels.cache.size) * 100)}% Canais de Texto | ${Math.round((message.guild.channels.cache.filter(chan => chan.type === 'category').size / message.guild.channels.cache.size) * 100)}% Categorias\`
    <:coroa:856527751816937482> **| Dono:** <@${message.guild.ownerID}>
    <:coroa:856527751816937482>  **| ID do Dono:** \`${message.guild.ownerID}\`
    📆 **| Você Entrou:** \`${message.member.joinedAt}\`
    **-- Shard --**
    <:cpu:854137097521987624> **Shard: ${message.guild.shard.id}/${config.shards}**
    `)
			.setFooter(` • Autor ${message.author.tag}`, message.author.displayAvatarURL({
				dynamic: true
			}))
		message.channel.send(serverembed);
	}
}
//    **| Proteção de verificação:** ${message.guild.verificationLevel}