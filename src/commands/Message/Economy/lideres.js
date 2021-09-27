const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'lideres',
  aliases: ['leaderboard'],
  cooldown: 1000 * 2,
  description: 'Lideres',
  category: 'economia',
  usage: '',
  example: '',
  permissoes: [],
  args: false,

  async run (client, message, args) {
    const money = db.all().filter(data => data.ID.startsWith('money_')).sort((a, b) => b.data - a.data)
    if (!money.length) {
      const noEmbed = new Discord.MessageEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL())
        .setColor('#ff58c3')
        .setDescription('Ninguém')
      return message.reply({ embeds: [noEmbed] })
    };

    money.length = 20
    let finalLb = ''
    for (const i in money) {
      if (money[i].data === null) money[i].data = 0
      const user = client.users.cache.get(money[i].ID.split('_')[2])
      finalLb += `**»** **${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : `${user}`}** - \`[${money[i].data} RCoins]\`\n`
    };
    let bal = db.fetch(`money_${message.author.id}`)
    if (bal === null) bal = '0'
    const embed = new Discord.MessageEmbed()
      .setTitle('<:outline_info_black_24dp:884959629124186172> **»** Rank Global - Top 20 pessoas com mais RCoins')
      .setColor('#ff58c3')
      .setDescription(finalLb)
      .setFooter(`Seu dinheiro » ${bal} RCoins!`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp()
    message.reply({ embeds: [embed] })
  }
}
