const Discord = require ("discord.js")

module.exports = {
    name: "mcskin",
    description: "O bot vai mandar a skin de algum player de minecraft.",
    aliases: ['skin'],
    cooldown: 1000 * 2, 
    category: "minecraft",
    usage: "<nickname>",
    example: "TheSpr4y",
	args: true,
	
    run: async(client, message, args) => { 
        
        if(!args[0]) return;

        let embed = new Discord.MessageEmbed()
        .setTitle(`Skin de: ${args[0]}`)
        .setImage(`https://mc-heads.net/body/${args[0]}`)
        .setColor("RANDOM")
        .setTimestamp()

        await message.channel.send(embed)
  
    }
}