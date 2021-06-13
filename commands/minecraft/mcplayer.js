const Discord = require ("discord.js")

module.exports = {
    name: "mcplayer",
    description: "player de minecraft.",
    aliases: [],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",

    run: async(client, message, args) => { 

        let embed = new Discord.MessageEmbed()
        .setTitle(`Skin de: ${args[0]}`)
        .setImage(`https://mc-heads.net/player/${args[0]}`)
        .setColor("RANDOM")
        .setTimestamp()

        await message.channel.send(embed)
  
    }
}