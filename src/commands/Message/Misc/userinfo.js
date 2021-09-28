const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  cooldown: 1000 * 2,
  description: 'Obtenha informações de um usuário.',
  category: 'misc',
  usage: '<id/@user>',
  example: '@Spray#7725',
  permissoes: [],
  args: false,

  async run (client, message, args) {
    const permissions = []
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

    const user = message.mentions.users.first() || message.author

    const flags = {
      DISCORD_STAFF: '<:BadgeDiscordStaff:869961802409209877>',
      DISCORD_EMPLOYEE: 'Discord Employee',
      DISCORD_PARTNER: '<:5270blurplepartner:856520144628744213>',
      BUGHUNTER_LEVEL_1: '<:BadgeDiscordBugHunter:853786346498031627>',
      BUGHUNTER_LEVEL_2: '<:BadgeDiscordBugHunterGold:853786346871193600>',
      HYPESQUAD_EVENTS: '<:HypeSquadEvents:869962392078020698>',
      HOUSE_BRAVERY: '<:BadgeHypeSquadBravery:869962263870705674>',
      HOUSE_BRILLIANCE: '<:1350discordbrillance:856520144762175498>',
      HOUSE_BALANCE: '<:BadgeHypeSquadBalance:869962147805921361>',
      EARLY_SUPPORTER: '<:early_developer_badge:854716150076538901>',
      TEAM_USER: 'Team User',
      SYSTEM: 'System',
      VERIFIED_DEVELOPER: '<:early_developer_badge:854716150076538901>'
    }

    const userFlags = user.flags.toArray()

    if (member.permissions.has('KICK_MEMBERS')) {
      permissions.push('Expulsar membros')
    }

    if (member.permissions.has('BAN_MEMBERS')) {
      permissions.push('Banir membros')
    }

    if (member.permissions.has('ADMINISTRATOR')) {
      permissions.push('Administrador')
    }

    if (member.permissions.has('MANAGE_MESSAGES')) {
      permissions.push('Gerenciar Mensagens')
    }

    if (member.permissions.has('MANAGE_CHANNELS')) {
      permissions.push('Gerenciar Canais')
    }

    if (member.permissions.has('MENTION_EVERYONE')) {
      permissions.push('Mencionar everyone')
    }

    if (member.permissions.has('MANAGE_NICKNAMES')) {
      permissions.push('Gerenciar apelidos')
    }

    if (member.permissions.has('MANAGE_ROLES')) {
      permissions.push('Gerenciar cargos')
    }

    if (member.permissions.has('MANAGE_WEBHOOKS')) {
      permissions.push('Gerenciar Webhooks')
    }

    if (member.permissions.has('MANAGE_EMOJIS')) {
      permissions.push('Gerenciar Emojis')
    }

    if (permissions.length == 0) {
      permissions.push('Nenhuma permissão encontrada')
    }

    if (member.user.id == message.guild.ownerID) {
      acknowledgements = 'Dono do servidor'
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
      .setColor('#2F3136')
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp()
      .addField('<:outline_groups_black_24dp:884959629036114000> **|** Usuário:', `<@${member.user.id}>`)
      .addField('<:outline_description_black_24dp:889218032331788308> **|** ID:', `${message.author.id}`, true)
      .addField('<:outline_event_black_24dp:889218032403120158> **|** Entrou em', `${moment(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
      .addField('<:outline_event_black_24dp:889218032403120158> **|** Conta criada em', member.user.createdAt.toLocaleString(), true)
      .addField('Badges:', `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nenhuma.'}`, true)
      .addField(`\n<:outline_dashboard_black_24dp:884959629040291870> **|** Cargos [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]:`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(' **|** ') || 'Sem cargos.'}`)
    // .addField("\nAcknowledgements:", `${acknowledgements}`)
      .addField('\n<:outline_info_black_24dp:884959629124186172> **|** Permissoes:', `${permissions.join(' **|** ')}`, true)
      .setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))
    message.reply({ embeds: [embed] })
  }
}
