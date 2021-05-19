const Discord = require('discord.js')
const moment = require('moment'); 
const db = require("quick.db");

exports.run = (client, message) => { 

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
    
    moment.locale('pt-br'); 
   let hora = moment().format('h:mm:ss a'); 
   let data = moment().format('dddd'); 
    const embed = new Discord.MessageEmbed() 
    .setTitle("Hora")
    .addField("<:info:835206734225473546> » Hoje é ", `${data}`)
    .addField("<:info:835206734225473546> » As horas são", `${hora}`)

    message.channel.send(embed) 

}

