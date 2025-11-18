const { MessageEmbed, Client, CommandInteraction, DiscordAPIError } = require('discord.js')

module.exports = {
  name: 'report',
  description: '[📝 INFO]  Reportar um erro para a minha equipe de desenvolvedores.',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'motivo',
      description: 'O motivo do report',
      type: 'STRING',
      required: true
    }
  ],
  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (client, interaction, args) => {
    const canal = client.channels.cache.get('842984263392428032')

    const embed = new MessageEmbed()
      .setTitle('Novo Bug/Report')
      .setThumbnail(client.user.displayAvatarURL())
      .addField('<:outline_bug_report_black_24dp:884961919461638257> Servidor que reportou', `${interaction.guild.name}`)
      .addField('<:outline_bug_report_black_24dp:884961919461638257> Reportado por', `${interaction.user.tag}`)
      .addField('<:outline_bug_report_black_24dp:884961919461638257> Menção', `${interaction.user}`)
      .addField('<:outline_bug_report_black_24dp:884961919461638257> ID de quem reportou', `${interaction.user.id}`)
      .addField('<:outline_bug_report_black_24dp:884961919461638257> Bug', `\`${args[0]}\``)
      .setColor('RANDOM')
    canal.send({ embeds: [embed] })

    const z = new MessageEmbed()
      .setDescription('<:outline_check_circle_black_24dp:884962192502423582> Seu bug/report foi enviado para minha equipe, muito obrigado por me ajudar a melhorar!\n Contato com o desenvolvedor: Spray#7725')
      .setColor('RANDOM')
    interaction.followUp({ embeds: [z] })
  }
}
