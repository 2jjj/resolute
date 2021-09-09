const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "loop",
    aliases: ['l'],
    category: "Music",
	description: "Toggle music loop",
	args: false,
    usage: "",
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
                .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
        }
		
		const emojiloop = message.client.emoji.loop;

        if (args.length && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
			let thing = new MessageEmbed()
				.setColor(message.client.embedColor)
				.setTimestamp()
				.setDescription(`${emojiloop} Loop queue is now **${queueRepeat}**`)
		   return message.channel.send({embeds: [thing]});
        }

        player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
		let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojiloop} Loop track is now **${trackRepeat}**`)
		    return message.channel.send({embeds: [thing]});
    }
};