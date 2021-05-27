const db = require("quick.db");
const Discord = require("discord.js")

module.exports = async (client, member) => {

	let canal_saida = db.get(`ferinha_saída_${member.guild.id}`);
	let ferinha_contador = member.guild.memberCount;
  
	if (!canal_saida) return;
  
	let embed_spray = new Discord.MessageEmbed() //mensagem embed
	.setAuthor(`${member.user.tag}`, member.user.avatarURL())
	.setDescription(`O usuário ${member.user} saiu do servidor! \nAtualmente estamos com \`${ferinha_contador}\` membros!`)
	.setColor("RANDOM")
	.setThumbnail(member.user.avatarURL());
  
	let msg_not_embed = `O usuário ${member.user} saiu do servidor! \nAtualmente estamos com \`${ferinha_contador}\` membros!`; //mensagem não embed
  
	client.channels.cache.get(canal_saida).send(embed_spray)

	db.delete(`money_${member.guild.id}_${member.id}`); 
	db.delete(`bank_${member.guild.id}_${member.id}`); 
	db.delete(`work_${member.guild.id}_${member.id}`); 
	db.delete(`daily_${member.guild.id}_${member.id}`); 
	db.delete(`rob_${member.guild.id}_${member.id}`); 
	console.log(`[LOGS] - [ECONOMIA] O ${member.tag} saiu do servidor ${member.guild.name}, e teve todos os status de economia removidos!`);
}