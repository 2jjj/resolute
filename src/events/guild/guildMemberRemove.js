const db = require("quick.db");

module.exports = async (member) => {
	db.delete(`money_${member.guild.id}_${member.id}`);
	db.delete(`bank_${member.guild.id}_${member.id}`);
	db.delete(`work_${member.guild.id}_${member.id}`);
	db.delete(`daily_${member.guild.id}_${member.id}`);
	db.delete(`rob_${member.guild.id}_${member.id}`);
	//crystol.log(`[LOGS] - [ECONOMIA] O ${member.tag} saiu do servidor ${member.guild.name}, e teve todos os status de economia removidos!`, "economia_member_remove.log", "America/Sao_Paulo");
}