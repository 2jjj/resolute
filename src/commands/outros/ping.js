const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async(bot, message, args) => { 

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    
    let embed = new Discord.MessageEmbed() 
    .setTitle(message.author.username)
    .setColor('RANDOM')
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`Calculando meu ping...`)
    .addField(`<a:check:835206263075242029> ⇝ Help`, [
        `Use \`s.help\` para saber mais comandos!`
    ])

    let embed2 = new Discord.MessageEmbed() 
    .setTitle(message.author.username)
    .setColor('RANDOM')
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription("<:2637settings:837767461138071572> | Espero que não esteja alto hahaha.")
    .addField(`<a:check:835206263075242029> ⇝ Help`, [
        `Use \`s.help\` para saber mais comandos!`
    ])

    let embed_ping = new Discord.MessageEmbed() 
    .setTitle(message.author.username)
    .setColor('RANDOM')
    .setThumbnail(message.author.displayAvatarURL())
    .addField(`<:info:835206734225473546> ⇝ Ping`,[
        `\`${parseInt(bot.ws.ping)}\` ms\n`
    ])
    .addField(`<a:check:835206263075242029> ⇝ Help`, [
        `Use \`s.help\` para saber mais comandos!`
    ])

    const msg = await message.channel.send(embed)
    setTimeout(() => {
      msg.edit(embed2)
    }, 3000) 
    setTimeout(() => {
      msg.edit(embed_ping)
    }, 5000)

}

