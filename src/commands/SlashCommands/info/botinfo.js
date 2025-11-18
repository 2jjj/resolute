const os = require('os')
const cpuStat = require('cpu-stat')
const { MessageEmbed, Client, CommandInteraction } = require('discord.js')
const config = require('../../../config/config.json')

module.exports = {
  name: 'botinfo',
  description: '[📝 INFO]  Obtenha as minhas informacões.',
  type: 'CHAT_INPUT',
  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (client, interaction, args, prefix) => {
    const usedMemory = os.totalmem() - os.freemem(); const totalMemory = os.totalmem()
    const getpercentage = (usedMemory / totalMemory * 100).toFixed(2) + '%'

    const { version } = require('discord.js')

    const usersEval = await client.shard.broadcastEval(u => u.users.cache.size)
    const guildsEval = await client.shard.broadcastEval(g => g.guilds.cache.size)
    const totalMembers = usersEval.reduce((prev, val) => prev + val, 0)
    const totalGuilds = guildsEval.reduce((prev, val) => prev + val, 0)
    const secs = Math.floor(client.uptime % 60)
    const days = Math.floor(client.uptime % 31536000 / 86400)
    const hours = Math.floor(client.uptime / 3600 % 24)
    const mins = Math.floor(client.uptime / 60 % 60)

    const embed = new MessageEmbed()
    // .setTitle("**Outras informações**")
      .setColor('#2F3136')
      .setDescription(`
        <:outline_info_black_24dp:884959629124186172> ・ Olá ${interaction.user} como vai? me chamo Resolute, tenho o intuito de melhorar o seu servidor!
        Fui criado na linguagem Javascript e atualmente possuo mais de ${client.commands.size} comandos para ajudar o seu servidor!
        ** ・ Outras informações:**
            > <:outline_code_black_24dp:884959629078061086> Desenvolvedor: \`${config.spray}\`
            > <:outline_dashboard_black_24dp:884959629040291870> Total de comandos: \`${client.commands.size}\`
            > <:outline_groups_black_24dp:884959629036114000> Total de servidores: \`${totalGuilds}\`
            > <:outline_people_black_24dp:884959628889309237> Total de usuários: \`${totalMembers}\`
            > <:outline_tag_black_24dp:884959628989968444> Total de canais: \`${client.channels.cache.size}\`
            > <:outline_emoji_emotions_black_24d:884959628843180083> Total de emojis: \`${client.emojis.cache.size}\`
        **・ Links úteis:**
            > <:outline_help_outline_black_24dp:884959629191315526> [Suporte](https://discord.gg/GRhdTpsTGE)
            > <:outline_add_black_24dp:884959502577844244> [Me adicione!](https://www.resolutebot.xyz/add)
            > <:outline_public_black_24dp:884959885769474118> [Website](https://www.resolutebot.xyz)
        `)

    const message = await interaction.followUp({ embeds: [embed] })
    message.react('<:5864blurplesearch:856520144817881118>')

    const filter = (reaction, user) => {
      return reaction.emoji.id === '856520144817881118' && user.id === interaction.user.id
    }

    const collector = message.createReactionCollector({ filter, time: 40000 })

    collector.on('collect', (reaction, user) => {
      if (user.id == client.user.id) return
      cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
          return console.log(err)
        }
        const embed2 = new MessageEmbed()
          .setTitle('** Status **')
          .setColor('RANDOM')
          .addField('<:memoryram:854135087037153280> Memória ultilizada', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
          .addField('<:3199blurplejoin:856520144829808650> Uptime ', `${days}d, ${hours}h, ${mins}m, ${secs}s `, true) // `${duration}`, true)
          .addField('<:djs:868314375751102484> Discord.js', `v${version}`, true)
          .addField('<:node:845780252940959744> Versão do Node', `${process.version}`, true)
          .addField('<:cpu:854137097521987624> CPU', `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField('<:cpuv:854137395254657026> CPU Usada', `\`${percent.toFixed(2)}%\``, true)
          .addField('<:linux:854135555557425163> Arquitetura', `\`${os.arch()}\``, true)
          .addField('<:linux:854135555557425163> OS', `\`\`${os.platform()}\`\``, true)
        interaction.editReply({ embeds: [embed2] })
      })
    })
  }
}
