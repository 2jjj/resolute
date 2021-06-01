const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "random",
    aliases: ['sorteador', 'numero'],
    cooldown: 1000 * 2, 
    description: "random",
    category: "outros",

    async run (client, message, args) {

let numero = Math.ceil(Math.random() * 100) 
message.channel.send(`> ` + numero) 
//⇝
}
}