const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "remove",
    category: "Music",
	description: "Remove song from the queue",
	args: false,
    usage: "<Number of song in queue>",
    example: "",
    permissoes: [],
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    async run(client, message, args, prefix) {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Não há nenhuma música tocando atualmente!");
            return message.reply({embeds: [thing]});
        }

        const position = (Number(args[0]) - 1);
        if (position > player.queue.size) {
            const number = (position + 1);
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Sem músicas no número ${number}.\nMúsicas totais: ${player.queue.size}`);
            return message.channel.send({embeds: [thing]});
        }

		const song = player.queue.remove(position);

		const emojieject = message.client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojieject} Removida a música:\n[${song.track.title}](${song.track.uri})`)
		  return message.channel.send({embeds: [thing]});
	
    }
};