const Discord = require("discord.js")
const config = require("../../../config/config.json")

module.exports = async (client, guild, message) => {    
    const dono = await client.guilds.fetch(guild.id).then(guilda => client.users.fetch(guilda.ownerID).then(o => `${o.tag} (${o.id})`))
    let embed = new Discord.MessageEmbed()
        .setTitle(`Novo servidor!`)
        .setDescription(`<:info:835206734225473546> | Servidor: ${guild.name}\n<:info:835206734225473546> | ID: ${guild.id}\n<:info:835206734225473546> | Membros: ${guild.memberCount} membros\n<:info:835206734225473546> | Dono: ${dono}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#00FF00')
    client.channels.cache.get("841393455694872597").send(embed);
}