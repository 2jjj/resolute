const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

let numero = Math.ceil(Math.random() * 100) 

message.channel.send(`⇝ ` + numero) 

}
