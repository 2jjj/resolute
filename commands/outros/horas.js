const Discord = require('discord.js') //requiremento do discord.js
const moment = require('moment'); //requirimento do moment

exports.run = (client, message) => { // exportando o evento client e message
    moment.locale('pt-br'); //falando para o moment qual é a nossa localização
   let hora = moment().format('h:mm:ss a'); // essa let falara as horas que são (Obs: Ele vai puxar o horario da sua hospedagem)
   let data = moment().format('dddd'); // essa let falara a data (Obs: Ele vai puxar a data da sua hospedagem)
    const embed = new Discord.MessageEmbed() // aqui será a constante embed
    .setTitle("Hora")
    .addField("<:info:835206734225473546> » Hoje é ", `${data}`)
    .addField("<:info:835206734225473546> » As horas são", `${hora}`)

    message.channel.send(embed) // enviara a mensagem

}

exports.help = {
    name: "hora",
    aliases: ["horas"]
}
