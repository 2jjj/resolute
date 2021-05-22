const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

let numero = Math.ceil(Math.random() * 100) 
message.channel.send(`<:spr4yxyz:837798446584168468> ⇝ ` + numero) 
//⇝
}
