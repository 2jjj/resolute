const { bsToken } = require('../../../config/keys.json')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')
const { stripIndents } = require('common-tags')

module.exports = {
  name: 'club',
  aliases: [],
  description: 'Ver informações de um clan',
  category: 'brawl',
  cooldown: 1000 * 2,
  usage: '<tag>',
  example: '#2QGPUJV82',
  permissoes: {
    membro: [],
    bot: []
  },
  args: true,

  async run(client, message, args, prefix) {
    if (!args[0]) return
    let members = 0
    let president
    const bestPlayers = []

    const res = await fetch(`https://api.brawlstars.com/v1/clubs/${encodeURIComponent(args[0])}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bsToken}`
      }
    })
    const status = await res.status
    const json = await res.json()
    if (status === 404) {
      return message.channel.send(
        'Essa tag é inválida.'
      )
    } else if (status === 503) {
      return message.channel.send(
        'O **Brawl Stars** está em manutenção, tente novamente mais tarde.'
      )
    }
    const embed = new MessageEmbed()
    json.members.forEach(m => {
      members += 1
      bestPlayers.push({ name: m.name, trophies: m.trophies })
      if (m.role === 'presidente') {
        president = m.name
      }
    })
    embed
      .setColor('#a626a6')
      .setTitle(`${json.name} | ${json.tag}`)
      .setURL(
				`https://brawlstats.com/club/${encodeURIComponent(
					args[0].replace('#', '')
				)}`
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/724146808598560789/758032896245235812/original.webp'
      )
      .setDescription(
        stripIndents`
                **Descrição**
                \`\`\`${json.description}\`\`\`
                **Presidente**
                \`${president}\`
                **Total troféus**
                \`${json.trophies}\`
                **Média de troféus**
                \`${(json.trophies / members).toFixed(0)}\`
                **Troféus necessários para entrar**
                \`${json.requiredTrophies}\`
                **Tipo**
                \`${json.type.charAt(0).toUpperCase() + json.type.slice(1)}\`
                **Membros**
                \`${members}/100\`
                `
      )
      .addFields([
        {
          name: 'Melhores players do clan',
          value: ` ${bestPlayers
						.slice(0, 5)
						.map(e => `\`${e.trophies} | ${e.name}\``)
					}`
        }
      ])
    return message.reply({ embeds: [embed] })
  }
}
