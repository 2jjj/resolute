const fetch = require('node-fetch')

module.exports = {
  name: 'discordjs',
  aliases: ['docs', 'discord.js'],
  cooldown: 1000 * 2,
  description: 'Comando para pesquisar algo nas docs do discord.js',
  category: 'misc',
  usage: '<conteudo>',
  example: 'message',
  permissoes: [],
  args: true,

  async run (client, message, args) {
    if (!args[0]) return

    const query = args.join('')

    fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`)
      .then(res => res.json())
      .then(json => {
        message.reply({
          embeds: [json]
        }).catch(() => message.reply('Não achei nenhum resultado para a sua pesquisa!'))
      })
  }
}
