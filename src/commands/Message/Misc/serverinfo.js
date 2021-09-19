const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
  name: 'serverinfo',
  aliases: ['serverinformation'],
  cooldown: 1000 * 2,
  description: 'Obtenha informações de seu servidor',
  category: 'misc',
  usage: '',
  example: '',
  permissoes: [],
  args: false,

  async run(client, message, args) {
    const boost =
      message.guild.premiumSubscriptionCount === 0 ?
      'Nenhum Boost' :
      `${message.guild.premiumSubscriptionCount} Boost(s) ( Level Server: ${message.guild.premiumTier} )`

    const channels = [
      `Categoria: ${
				message.guild.channels.cache.filter((x) => x.type == 'category').size
			}`,
      `Texto: ${
				message.guild.channels.cache.filter((x) => x.type == 'text').size
			}`,
      `Voz: ${
				message.guild.channels.cache.filter((x) => x.type == 'voice').size
			}`
    ].join('\n')

    const SERVERINFO = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setAuthor(message.guild.name, message.guild.iconURL({
        dynamic: true
      }))
      .addFields({
        name: '🆔 ID do Servidor:',
        value: ` ${message.guild.id}`,
        inline: true
      }, {
        name: '<:coroa:856527751816937482> Propietário:',
        value: ` ${message.guild.fetchOwner().user}`,
        inline: true
      }, {
        name: '<:calendario:876819338802376735> Data de Criação:',
        value: `${moment(message.guild.createdAt).format('L')} ( ${moment(
					message.guild.createdAt
				)
					.startOf('day')
					.fromNow()} )`
      }, {
        name: '<:NitroBoost:869959413379792896> Boosters',
        value: ` ${boost}`
      }, {
        name: '👥 Total de Usuários:',
        value: ` ${message.guild.memberCount.toLocaleString()}`,
        inline: true
      }, {
        name: '🤖 Bots:',
        value: ` ${message.guild.members.cache
					.filter((x) => x.user.bot)
					.size.toLocaleString()}`,
        inline: true
      }, {
        name: `<:3199blurplejoin:856520144829808650> Total de Canais: ( **${message.guild.channels.cache.size}** )`,
        value: ` ${channels}`
      })
      .setThumbnail(message.guild.iconURL({
        dynamic: true
      }))
      .setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    message.reply({
      embeds: [SERVERINFO]
    })
  }
}