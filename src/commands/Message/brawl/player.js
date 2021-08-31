const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const {  bsToken } = require('../../../config/keys.json');


module.exports = {
    name: "player",
    aliases: [],
    description: "Ver informações de um player",
    category: "brawl",
    cooldown: 1000 * 2,
    usage: "",
    example: "",
    permissoes: {
        membro: [],
        bot: []
    },
    args: false,

    run: async (client, message, args, prefix) => {

        let brawlers = 0;
		if (!args[0]) {
			return message.channel.send(
				'Please provide a tag!'
			);
		}

		const res = await fetch(`https://api.brawlstars.com/v1/players/${encodeURIComponent(args[0])}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bsToken}`
			}
		});
		const status = await res.status;
		const json = await res.json();
		if (status === 404) {
			return message.channel.send(
				'Por favor me de uma tag!'
			);
		} else if (status === 503) {
			return message.channel.send(
                '**Brawl Stars** está em manutenção, tente novamente mais tarde.'
            );
		}

		const embed = new MessageEmbed();
		json.brawlers.forEach(() => {
			brawlers += 1;
		});
		embed
			.setColor('#a626a6')
			.setTitle(`${json.name} | ${json.tag}`)
			.setURL(
				`https://brawlstats.com/profile/${encodeURIComponent(
					args[0].replace('#', '')
				)}`
			)
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/724146808598560789/758032896245235812/original.webp'
			)
			.setDescription(stripIndents`
					**Clan**
					\`${json.club.name ? `${json.club.name} | ${json.club.tag}` : 'Nenhum'}\`
					**Troféus**
					\`${json.trophies}\`
					**Maior troféus**
					\`${json.highestTrophies}\`
					**Maiores Pontos de Potência**
					\`${json.highestPowerPlayPoints}\`
					**O mais alto nível Robo Rumble passou**
					\`${json.bestRoboRumbleTime}\`
					**3 vs 3 Vitórias**
					\`${json['3vs3Victories']}\`
					**Confronto**
					\`Solo: ${json.soloVictories} | Duo: ${json.duoVictories}\`
					**Level**
					\`${json.expLevel}\`
					**Braws desbloqueados**
					\`${brawlers}\`
					`);
		return message.channel.send({ embeds: [embed] });
    }
}