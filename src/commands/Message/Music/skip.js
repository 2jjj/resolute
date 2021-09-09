const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "skip",
	aliases: ["s"],
	category: "Music",
	description: "Skip the currently playing song",
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

        const autoplay = player.get("autoplay");
        const song = player.queue.current;

        if (autoplay === false) {
            player.stop();
        } else {
            player.stop();
            player.queue.clear();
            player.set("autoplay", false);
        }
		
		const emojiskip = message.client.emoji.skip;

		let thing = new MessageEmbed()
			.setDescription(`${emojiskip} **Música avancada para a próxima da fila;**\n[${song.title}](${song.uri})`)
			.setColor(message.client.embedColor)
			.setTimestamp()
		return message.channel.send({embeds: [thing]});
    }
};