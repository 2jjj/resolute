const {
	stripIndents
} = require("common-tags");
const Discord = require("discord.js");

const fetch = require("node-fetch");

module.exports = {
	name: "instagram",
	aliases: ["insta"],
	category: "outros",
	cooldown: 1000 * 2,
	description: "Consiga informações do insta de alguém!",
	usage: "<usuário_instagram>",
	example: "instagram neymar",

	async run(client, message, args) {

		if (!args[0]) {
			return;
		}

		const name = args.join(" ");
		const url = `https://instagram.com/${name}/?__a=1`;

		let res;

		try {
			res = await fetch(url).then(url => url.json());
		} catch (e) {
			return message.reply("Eu não achei essa conta!")
				.then(m => m.delete(5000));
		}

		const account = res.graphql.user;

		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setTitle(account.full_name)
			.setURL(`https://instagram.com/${name}`)
			.setThumbnail(account.profile_pic_url_hd)
			.addField("Profile information", stripIndents`**- Username:** ${account.username}
            **- Nome:** ${account.full_name}
            **- Biografia:** ${account.biography.length == 0 ? "Nenhuma" : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Seguidores:** ${account.edge_followed_by.count}
            **- Seguindo:** ${account.edge_follow.count}
            **- Conta privada?:** ${account.is_private ? "Sim 🔐" : "Não 🔓"}`);

		message.channel.send(embed);
	}
}