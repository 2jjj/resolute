const translate = require('@iamtraction/google-translate')

module.exports = {
	name: "translate",
	aliases: ['t'],
	cooldown: 1000 * 2,
	description: "Traduzir algo que deseja!",
	category: "outros",
	usage: "en/pt/fr/lt <texto>",
	example: "en Hello",
	permissoes: [],
    args: true,
	
	async run(client, message, args) {

		if (!args[0]) return;

		let googlepng = 'https://i.imgur.com/oZA4FaQ.png'
		let language = args[0]
		let text = args.slice(1).join(" ")

		let colors = ['RED', 'YELLOW', 'GREEN', 'BLUE']
		let result = colors[Math.floor(Math.random() * colors.length)]

		translate(args.slice(1).join(" "), {
			to: language
		}).then(res => {
			const translateEmbed = new Discord.MessageEmbed()
				.setColor(result)
				.setAuthor(`Google Tradutor`, googlepng)
				.setDescription("```css\n" + `${res.text}` + "\n```", false)
				.setColor("#RANDOM")
			message.inlineReply(translateEmbed)
		}).catch(err => {
			message.inlineReply("<:1926blurplecross:856520144872407060> **|** Eu tive um problema com a tradução.\n:1926blurplecross: **|** Tente novamente com outro idioma.")
		})
	}
}