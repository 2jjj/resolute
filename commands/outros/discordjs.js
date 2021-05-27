const Discord = require("discord.js")
const fetch = require("node-fetch") 
const db = require("quick.db")

module.exports = {
    name: "discordjs",
    aliases: ['docs', 'discord.js'],
    cooldown: 1000 * 2, 
    description: "close ticket",
    category: "outros",

async run (client, message, args) {
let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."

const query = args.join("") 
if (!query) {
 message.reply("Diga algo para eu pesquisar nas docs do discord.js!") 
}
fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`) 
.then(res => res.json()) 
.then(json => {
 message.channel.send({ embed: json }).catch(() => message.reply("Não achei nenhum resultado para sua pesquisa!"))

}) 
}}