const Discord = require('discord.js')
const moment = require('moment'); 

module.exports = {
    name: "horas",
    aliases: ['dia'],
    cooldown: 1000 * 2, 
    description: "Que horas são?",
    category: "outros",
    usage: "",

    async run (client, message, args) {

    moment.locale('pt-br'); 
    let hora = moment().format('h:mm:ss a'); 
    let data = moment().format('dddd'); 
    const embed = new Discord.MessageEmbed() 
    .setTitle("Hora")
    .addField("» Data ", `${data}`)
    .addField("» As horas são", `${hora}`)

    message.channel.send(embed) 

}
}