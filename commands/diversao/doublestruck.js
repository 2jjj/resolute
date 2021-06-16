const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "doublestruck",
    aliases: ["ds"],
    cooldown: 1000 * 2, 
    description: "Fale por uma fonte dahora!",
    category: "fun",
    usage: "<texto>",
  
  async run (client, message, args) {
  
    let text = args.join("+")
    if(!text) return message.reply('Por favor coloque um texto!')
    let res = await fetch('https://api.popcatdev.repl.co/doublestruck?text=' + text);
    let json = await res.json();
    message.channel.send(json.text)
 }
}