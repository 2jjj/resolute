const {
	MessageEmbed
} = require(`discord.js`);
const config = require(`../../../config/config.json`);
const ee = require(`../../../config/embed.json`);
const emoji = require(`../../../config/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);

module.exports = {
	name: "play",
	aliases: [],
	cooldown: 1000 * 2,
	description: "",
	category: "music",
	usage: "",
	example: "",
	args: true,
	permissoes: {
		membro: [],
		bot: []
	},

	async run(client, message, args, text) {

		message.channel.send(new MessageEmbed()
			.setColor(ee.color)
			.setTitle(`**Searching** 🔎`)
			.setDescription(`\`\`\`${text}\`\`\``)
		).then(msg => {
			msg.delete({
				timeout: 5000
			}).catch(e => console.log("Could not delete, this prevents a bug"))
		})

		//play the SONG from YOUTUBE
		playermanager(client, message, args, `song:youtube`);

	}
}