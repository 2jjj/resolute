const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: "tweet",
    aliases: [],
    description: 'Escreva um tweet',
    category: "manipulacao",
    cooldown: 1000 * 2, 
    usage: "<texto>",


async run (client, message, args) {
    
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