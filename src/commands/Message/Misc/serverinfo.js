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
        name: '<:outline_description_black_24dp:889218032331788308> ID do Servidor:',
        value: ` ${message.guild.id}`,
        inline: true
      }, {
        name: '<:royalcrown:889219130035695616> Propietário:',
        value: ` ${message.guild.fetchOwner().user}`,
        inline: true
      }, {
        name: '<:outline_event_black_24dp:889218032403120158> Data de Criação:',
        value: `${moment(message.guild.createdAt).format('L')} ( ${moment(
					message.guild.createdAt
				)
					.startOf('day')
					.fromNow()} )`
      }, {
        name: '<:badgeBoostLVL9:889219239964180541> Boosters',
        value: ` ${boost}`
      }, {
        name: '<:outline_people_black_24dp:884959628889309237> Total de Usuários:',
        value: ` ${message.guild.memberCount.toLocaleString()}`,
        inline: true
      }, {
        name: '<:outline_smart_toy_black_24dp:889218032407289916> Bots:',
        value: ` ${message.guild.members.cache
					.filter((x) => x.user.bot)
					.size.toLocaleString()}`,
        inline: true
      }, {
        name: `<:outline_tag_black_24dp:884959628989968444> Total de Canais: ( **${message.guild.channels.cache.size}** )`,
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