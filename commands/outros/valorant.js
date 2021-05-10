const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  if (args[0]) { return message.channel.send('<:bravinha:841126251741970452> Por favor, utilize apenas o comando, sem nada na frente. Informações desnecessárias atrapalham meu processamento.') }

  var game = 'Valorant'
  var link1 = 'https://playvalorant.com/pt-br/'
  var site = 'Site Oficial'
  var win = 'Windows 10'

  var GameEmbed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`${game}`)
    .addField(`${site}`, `${link1}`)
    .setFooter(`Plataformas: ${win}`)
  return message.channel.send(GameEmbed)
}

exports.help = {
  name: "valorant",
  aliases: ["valorant"]
}