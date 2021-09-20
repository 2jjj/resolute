const { MessageEmbed, Client, CommandInteraction } = require('discord.js')
const { readdirSync } = require('fs')

module.exports = {
  name: 'ajuda',
  description: '[📝 INFO]  Veja os meus comandos!',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'comando',
      description: 'Caso queira informacões mais complexas de um comando.',
      type: 'STRING',
      required: false
    }
  ],
  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (client, interaction, args, prefix) => {
    if (!args[0]) {
      const categories = []

      readdirSync('./src/commands/').forEach((dir) => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
          file.endsWith('.js')
        )
        const cmds = commands.map((command) => {
          const file = require(`../../../commands/${dir}/${command}`)

          if (!file.name) return 'Sem nome do comando.'

          const name = file.name.replace('.js', '')

          return `\`${name}\``
        })

        let data = new Object()

        data = {
          name: dir,
          value: cmds.length === 0 ? 'Em progresso.' : cmds.join(' ')
        }

        categories.push(data)
      })

      const misc = client.commands.filter((cmd) => cmd.category === 'misc')
      const economia = client.commands.filter((cmd) => cmd.category === 'economia')
      const brawl = client.commands.filter((cmd) => cmd.category === 'brawl')
      const manipulacao = client.commands.filter((cmd) => cmd.category === 'manipulacao')
      const info = client.commands.filter((cmd) => cmd.category === 'info')
      const mod = client.commands.filter((cmd) => cmd.category === 'mod')
      const music = client.commands.filter((cmd) => cmd.category === 'Music')
      const config = client.commands.filter((cmd) => cmd.category === 'config')
      const bot = client.commands.filter((cmd) => cmd.category === 'bot')
      const pescaria = client.commands.filter((cmd) => cmd.category === 'pescaria')

      const embed = new MessageEmbed()
      // .addField(`⚙️ ** | Configuráveis** [${config.size}]:`, `\`${config.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`🎵 ** | Música** [${music.size}]:`, `\`${music.map(cmd => cmd.name).join(' | ')}\``)
      // .addField(`🎣 ** | Pescaria** [${pescaria.size}]:`, `\`${pescaria.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`⭐ ** | Brawlstars** [${brawl.size}]:`, `\`${brawl.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`🔰 ** | Moderação** [${mod.size}]:`, `\`${mod.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`💵 ** | Economia e social** [${economia.size}]:`, `\`${economia.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`🔍 ** | Outros comandos** [${misc.size}]:`, `\`${misc.map(cmd => cmd.name).join(' | ')}\``)
      // .addField(`🖼️ ** | Manipulação de imagens** [${manipulacao.size}]:`, `\`${manipulacao.map(cmd => cmd.name).join(' | ')}\``)
      // .addField(`🔍 ** | Bot** [${bot.size}]:`, `\`${bot.map(cmd => cmd.name).join(' | ')}\``)
      // .addField(`<:interrogacao:856894534029541376> ** | Informação** [${info.size}]:`, `\`${info.map(cmd => cmd.name).join(' | ')}\``)
      // .addField(`<:mine_foguete:852197847754604565> ** | Minecraft** [${minecraft.size}]:`, `\`${minecraft.map(cmd => cmd.name).join(' | ')}\``)
      // .addField(`🤣 ** | Diversão** [${fun.size}]:`, `\`${fun.map(cmd => cmd.name).join(' | ')}\``)
      // .addField(`<:early_developer_badge:854716150076538901> ** | Desenvolvedor** [${dev.size}]:`, `\`${dev.map(cmd => cmd.name).join(' | ')}\``)
      // .addField(`⚜️ ** | Custom Queue(s)** [${queue.size}]:`, `\`${queue.map(cmd => cmd.name).join(' | ')}\``)
      // .addFields(categories)
      // .setDescription(`Use \`${prefix}help\` seguido por um nome de comando para obter mais informações adicionais sobre um comando.\nPor exemplo: \`${prefix}help ban\`.\n**Prefixo atual: ${prefix}**\n**Meus Comandos[${client.commands.size}]:**`)
      // .setImage("https://cdn.discordapp.com/attachments/852652786139136060/853441413396168734/Sem_Titulo22-1.png")
        .setTimestamp()
        .setColor('#2F3136')
      interaction.followUp({ embeds: [embed] })
    } else {
      const command =
            client.commands.get(args[0].toLowerCase()) ||
            client.commands.find(
            	(c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
            )

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Comando inválido, use \`${prefix}help\` para todos os meus comandos.`)
          .setColor('RANDOM')
        return message.channel.send(embed)
      }

      const embed = new MessageEmbed()
        .setTitle(`<:outline_info_black_24dp:884959629124186172> | Detalhes do comando \`${command.name}\``)
        .addField('<:outline_arrow_right_alt_black_24:884959628973178910> Prefixo:', `\`${prefix}\``)
        .addField(
          '<:outline_arrow_right_alt_black_24:884959628973178910> Comando:',
          command.name ? `\`${command.name}\`` : 'Sem nome para esse comando.'
        )
        .addField(
          '<:outline_arrow_right_alt_black_24:884959628973178910> Aliases/apelidos:',
          command.aliases
            ? `\`${command.aliases.join('` `')}\``
            : 'Sem aliases para esse comando.'
        )
        .addField(
          '<:outline_arrow_right_alt_black_24:884959628973178910> Forma de uso:',
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          '<:outline_arrow_right_alt_black_24:884959628973178910> Exemplo:',
          command.example
            ? `\`${prefix}${command.name} ${command.example}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          '<:outline_arrow_right_alt_black_24:884959628973178910> Descrição:',
          command.description
            ? `\`${command.description}\``
            : 'Sem aliases para esse comando.'
        )
        .setFooter(
					`Requisitado por: ${message.author.tag}`,
					message.author.displayAvatarURL({
					  dynamic: true
					})
        )
        .setTimestamp()
        .setColor('RANDOM')
      interaction.followUp({ embeds: [embed] })
    }
  }
}
