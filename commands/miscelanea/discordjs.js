const Discord = require("discord.js")
const fetch = require("node-fetch") 
const db = require("quick.db")

module.exports = {
    name: "discordjs",
    aliases: ['docs', 'discord.js'],
    cooldown: 1000 * 2, 
    description: "Pesquisar algo nas docs do discord.js",
    category: "outros",
    usage: "<docs_name>",

async run (client, message, args) {

    const query = args.join("") 

    fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`) 
    .then(res => res.json()) 
    .then(json => {
    message.channel.send({ embed: json }).catch(() => message.reply("Não achei nenhum resultado para sua pesquisa!"))

}) 
}}