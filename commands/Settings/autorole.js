const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "autorole",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Setar o cargo automático de quando alguém entrar em seu servidor.",
	category: "config",
    usage: "set <@cargo>",
    example: "@Membros",
	permissoes: ["ADMINISTRATOR", "Administrador"],
	args: false,

	async run(client, message, args, cmduser, text, prefix, player) {

		if (!args[0]) {
			let embed = new Discord.MessageEmbed()
			.setTitle(`Menu de ajuda - \`autorole\``)
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.setDescription(`${module.exports.description}`)
			.addField(`:bulb: Modos de Uso:`, ` \`${prefix}autorole <set/desligar> <@cargo>\``)
			.addField(`:thinking: Exemplo:`, ` \`${prefix}autorole set @Membros\n${prefix}autorole desligar @Membros\``)
			.addField(`🔹 Aliases:`, ` \`${module.exports.aliases.length !== 0 ? `${module.exports.aliases}` : `Sem sinonimos para este comando.` }\``)
			.addField(`🔹 Permissões necessárias:`, ` \`${module.exports.permissoes[0, 1] !== undefined ? `${module.exports.permissoes[1]}` : `Não é necessário nenhuma permissão!` }\``)
			.setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
				dynamic: true
			}))
			.setTimestamp();
		message.channel.send(embed)
		}

		if(args[0] == "set") {
			let cargo_autorole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

			db.set(`autorole_${message.guild.id}`, cargo_autorole.id);
			db.set(`autorole_config_${message.guild.id}`, true)
	
			const confirma = new Discord.MessageEmbed()
				.setTitle("Autorole ativado!")
				.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
				.addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
				.addField(`Cargo:`, `ﾠ<:setaaa:860626769089265665> ${cargo_autorole}`)
				.setFooter("Resolute - Autorole", message.author.displayAvatarURL())
				.setTimestamp();
			message.channel.send(confirma);
		}

		if (args[0] == "desligar") {

            let cargo_autorole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

            db.delete(`autorole_${message.guild.id}`, cargo_autorole.id);
            db.delete(`autorole_config_${message.guild.id}`, true)

            const confirma = new Discord.MessageEmbed()
                .setTitle("Autorole desativado!")
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                .addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
                .addField(`Cargo:`, `ﾠ<:setaaa:860626769089265665> ${cargo_autorole}`)
                .setFooter("Resolute - Autorole", message.author.displayAvatarURL())
                .setTimestamp();
            message.channel.send(confirma);
        }
	}
}