const Discord = require('discord.js')
const moment = require('moment');

module.exports = {
	name: "horas",
	aliases: ['dia'],
	cooldown: 1000 * 2,
	description: "Comando para mostrar as horas e o dia",
	category: "outros",
	usage: "",

	async run(client, message, args) {

		moment.locale('pt-br');
		let hora = moment().format('h:mm:ss a');
		let data = moment().format('dddd');
		const embed = new Discord.MessageEmbed()
			.setTitle("Hora")
			.addField("» Dia ", `${data}`)
			.addField("» Horário", `${hora}`)
		message.channel.send(embed)

	}
}