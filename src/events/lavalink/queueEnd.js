const delay = require("delay");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, message) => {
	message.guild.me.voice.channel.leave();

	const channel = client.channels.cache.get(player.textChannel);
	const emojiwarn = client.emoji.warn;
	let thing = new MessageEmbed()
		.setColor(client.embedColor)
		.setDescription(`${emojiwarn} **Todas as músicas foram tocadas.\nEstou saindo do canal de voz!**`)
		.setFooter(client.user.username, client.user.displayAvatarURL());
	channel.send({embeds: [thing]});
}