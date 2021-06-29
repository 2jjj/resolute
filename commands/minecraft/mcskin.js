const Discord = require ("discord.js")

module.exports = {
    name: "mcskin",
    description: "O bot vai mandar a skin de algum player de minecraft.",
    aliases: [],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",
    example: "mcskin TheSpr4y",

    run: async(client, message, args) => { 
        
        if(!args[0]) return console.log(0)

        let embed = new Discord.MessageEmbed()
        .setTitle(`Skin de: ${args[0]}`)
        .setImage(`https://mc-heads.net/body/${args[0]}`)
        .setColor("RANDOM")
        .setTimestamp()

        await message.channel.send(embed)
  
    }
}