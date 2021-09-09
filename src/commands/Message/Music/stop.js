const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "stop",
    category: "Music",
    description: "Stops the music",
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
                .setDescription("Não há nenhuma música tocando atualmente!");
            return message.reply({embeds: [thing]});
        }

        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.stop();
        player.queue.clear();

        const emojistop = message.client.emoji.stop;

		let thing = new MessageEmbed()
            .setColor(message.client.embedColor)
            .setTimestamp()
            .setDescription(`${emojistop} Parei a música`)
        message.channel.send({embeds: [thing]});
	
  	}
};