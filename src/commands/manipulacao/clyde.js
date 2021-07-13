const {
	MessageAttachment
} = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
	name: "clyde",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Faça nosso querido bot Clyde falar algo!",
	category: "manipulacao",
	usage: "<texto>",
	example: "ola spray voce esta banido",
	args: true,
	
	async run(client, message, args) {

		if(!args[0]) return;

		const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${args[0]}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		} catch (e) {
			return message.channel.send('❎ Ocorreu um erro, por favor tente novamente!');
		}
		const attachment = new MessageAttachment(response.message, 'clyde.png');
		return message.channel.send(attachment);

	}

}