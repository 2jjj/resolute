const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "skipto",
	aliases: ["jump"],
	category: "Music",
	description: "Forward song",
	args: true,
    usage: "<Number of song in queue>",
    example: "",
    permissoes: [],
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    async run(client, message, args, prefix) {
  
        if(!args[0]) return;

		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Não há nenhuma música tocando atualmente!");
            return message.reply({embeds: [thing]});
        }

        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Usage: ${message.client.prefix}volume <Number of song in queue>`)
            return message.channel.send({embeds: [thing]});
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		const emojijump = message.client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Forward **${position}** Songs`)
			.setColor(message.client.embedColor)
			.setTimestamp()
			
		return message.channel.send({embeds: [thing]});
	
    }
};