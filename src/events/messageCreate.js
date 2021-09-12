const client = require('../../index')
const config = require('../config/config.json')
const { logs } = require('../config/webhooks.json')
const ee = require('../config/embed.json')
const { MessageEmbed } = require('discord.js')

client.on('messageCreate', async (message) => {
  const channel = client.channels.cache.get(logs.comandos)
  const webhooks = await channel.fetchWebhooks()
  const webhook = webhooks.first()
  let argumentos

  const prefix = config.prefix

  if (message.content.startsWith('<')) {
    if (message.content.endsWith('>')) {
      if (message.mentions.has(client.user.id)) {
        return message.reply('Olá! meu prefixo atual é `' + prefix + '`, use `' + prefix + 'help` para obter ajuda!')
      }
    }
  }

  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return

  const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(' ')
  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()))

  if (!command) return
  await command.run(client, message, args, prefix)

  if (command) {
    argumentos = args.slice(0).join(' ')

    // Logs
    const embed_logs = new MessageEmbed()
      .setColor(ee.color)
      .setTitle('<:setaaa:860626769089265665> Nova comando executado')
      .addField('**Servidor**', message.guild.name)
      .addField('**Servidor ID**', message.guild.id)
      .addField('**Executado por**', message.author.tag + ' ( ' + message.author.id + ' )')
      .addField('**Comando**', command.name)
      .setThumbnail(message.author.displayAvatarURL({
        dynamic: true,
        format: 'png'
      }))
      .setFooter(ee.footertext, ee.footericon)
      .setTimestamp()
    if (argumentos) embed_logs.addField('**Argumentos**', argumentos)

    await webhook.send({
      embeds: [embed_logs]
    })

    console.log(`[MESSAGE] - Comando ${command.name} foi usado pelo ${message.author.username}#${message.author.discriminator} (${message.author.id})`)
  }// Finalizado o if(command) btw

  // LAVALINK

  const player = message.client.manager.get(message.guild.id)

  /*

  const embed = new MessageEmbed()
  .setColor("#2F3136");

  if (command.inVoiceChannel && !message.member.voice.channel) {
    embed.setDescription("Você precisa estar em um canal de voz!");
    return message.channel.send({embeds: [embed]});
  }

  if (command.player && !player) {
    embed.setDescription("Não há nada tocando para este servidor.");
    return message.channel.send({embeds: [embed]});
  }
  if (command.sameVoiceChannel && message.member.voice.channel !== message.guild.me.voice.channel) {
    embed.setDescription(`Você precisa estar no mesmo canal que o ${message.client.user}!`);
    return message.channel.send({embeds: [embed]});
  } */

  // args automátizada.

  const help = new MessageEmbed()
    .setTitle(`<:1598blurplesupport:856520144599777291> | Menu de ajuda - \`${command.name}\``)
    .setColor('RANDOM')
    .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
    .setDescription(`**${command.description}**`)
    .addField(':bulb: Modos de Uso:', ` \`${command.usage.length !== 0 ? `${prefix}${command.name} ${command.usage}` : `${command.name}`}\``)
    .addField(':thinking: Exemplo:', ` \`${command.example !== undefined ? `${prefix}${command.name} ${command.example}` : 'Sem exemplos para este comando.'}\``)
    .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
      dynamic: true
    }))
    .setTimestamp()

  try {
    if (command.args == true) {
      if (command.permissoes.membro == undefined) command.permissoes.membro = 0
      if (command.permissoes.bot == undefined) command.permissoes.bot = 0

      if (command.permissoes.bot == 0 || command.permissoes.membro == 0) {
        if (!argumentos[0]) {
          return message.reply({
            embeds: [help]
          })
        }
      } else if (!argumentos[0]) {
        help
          .addField('🔹 Permissões que você precisa:', ` \`${command.permissoes.membro !== 0 ? `${command.permissoes.membro[1]}` : 'Não é necessário nenhuma permissão!'}\``)
          .addField('🔹 Permissões que eu preciso:', ` \`${command.permissoes.bot !== 0 ? `${command.permissoes.bot[1]}` : 'Não é necessário nenhuma permissão!'}\``)
        if (!message.member.permissions.has(command.permissoes.membro[0])) return message.reply(`<:outline_clear_black_24dp:884962739007672390> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${command.permissoes.membro[1]}\`!`)
        if (!message.guild.me.permissions.has(command.permissoes.bot[0])) return message.reply(`<:outline_clear_black_24dp:884962739007672390> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${command.permissoes.bot[1]}\`!`)

        return message.reply({
          embeds: [help]
        })
      }
    }
  } catch {}
})

// by spray.
