const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "shuffle",
    category: "Music",
    description: "Shuffle queue",
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


        player.queue.shuffle();
        
        const emojishuffle = message.client.emoji.shuffle;

        let thing = new MessageEmbed()
            .setDescription(`${emojishuffle} Shuffled the queue`)
            .setColor(message.client.embedColor)
            .setTimestamp()
        return message.channel.send({embeds: [thing]}).catch(error => message.client.logger.log(error, "error"));
	
    }
};