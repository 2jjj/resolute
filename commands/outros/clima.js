const Discord = require("discord.js")
const weather = require("weather-js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) { prefix = "-" }

  var noargs = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('⛅')
    .setDescription('<:info:835206734225473546> » Aqui você pode ver o clima de qualquer lugar do mundo, explore o clima dos paises e cidades.')
    .addField("Exemplo", '`' + prefix + 'clima SP ou São Paulo`')

  if (!args[0]) { return message.channel.send(noargs) }

  let city = args.join(" ")
  let degreetype = "C"

  await weather.find({ search: city, degreeType: degreetype }, function (err, result) {

    var noresult = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('<:2754danger:837767461058641931> | Parece que ocorreu um erro no meu sistema de busca')
      .setDescription('<:info:835206734225473546> `Nenhuma cidade/estado foi encontrado`')

    if (!city) { return message.inlineReply(':x: Formato incorreto! | `' + prefix + 'clima SP/RJ/MG ou o nome da Cidade/Estado`') }
    if (err || result === undefined || result.length === 0) { return message.inlineReply('<:info:835206734225473546> Nenhuma cidade/estado foi encontrado, verifique a ortografia.') }

    let current = result[0].current
    let location = result[0].location

    let embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setAuthor(current.observationpoint)
      .setDescription(`> ${current.skytext}`)
      .setThumbnail(current.imageUrl)
      .setTimestamp()

    embed.addField("Latitude", location.lat, true)
      .addField("Longitude", location.long, true)
      .addField("Temperatura Térmica", `${current.feelslike}° Graus`, true)
      .addField("Escala de Medição", location.degreetype, true)
      .addField("Vento", current.winddisplay, true)
      .addField("Humidade", `${current.humidity}%`, true)
      .addField("Fuzo", `GMT ${location.timezone}`, true)
      .addField("Temperatura", `${current.temperature}° Graus`, true)
      .addField("Observação TimeTemp", current.observationtime, true)
      .setFooter('Resolute')

    return message.channel.send(embed)
  })
}
