const fetch = require('node-fetch');
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "doublestruck",
  aliases: ["ds"],
  cooldown: 1000 * 2,
  description: "Fale por uma fonte dahora!",
  category: "fun",
  usage: "<texto>",

  async run(client, message, args) {

    let text = args.join("+")

    if (!text) return;

    let res = await fetch('https://api.popcatdev.repl.co/doublestruck?text=' + text);
    let json = await res.json();
    message.channel.send(json.text)
  }
}