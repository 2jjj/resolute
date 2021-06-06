const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "random",
    aliases: ['sorteador', 'numero'],
    cooldown: 1000 * 2, 
    description: "Um número aleatório, que doidera né spray? ta sem ideia heim!kkk",
    category: "outros",
    usage: "",

    async run (client, message, args) {

        console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)


let numero = Math.ceil(Math.random() * 100) 
message.channel.send(`> ` + numero) 
//⇝
}
}