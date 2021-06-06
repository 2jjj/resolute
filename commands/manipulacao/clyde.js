const Discord = require('discord.js');

const { MessageAttachment } = require('discord.js')
const fetch = require('node-fetch')
module.exports = {
    name: "clyde",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Faça nosso querido bot Clyde falar algo!",
    category: "manipulacao",
	usage: "<texto>",
  
    async run (client, message, args) {

		console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`) 
		
		const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				' :x: Favor fornecer texto válido.',
			);
		}

		const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('❎ Ocorreu um erro, por favor tente novamente!');
		}
		const attachment = new MessageAttachment(response.message, 'clyde.png');
		return message.channel.send(attachment);
  
    }

}