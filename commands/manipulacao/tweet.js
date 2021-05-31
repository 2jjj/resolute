const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const db = require("quick.db");

module.exports = {
    name: "tweet",
    aliases: [],
    description: 'Escreva um tweet',
    category: "manipulacao",
    cooldown: 1000 * 2, 


async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
  

    fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.join(' ')}`)
            .then((res) => res.json())
            .then((data) => {
                let embed = new MessageEmbed()
                    .setTitle("Tweet!")
                    .setImage(data.message)
                    .setTimestamp()
                message.channel.send(embed)
            })
        }}