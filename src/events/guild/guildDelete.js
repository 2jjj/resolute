const ee = require('../../config/embed.json')
const { logs } = require('../../config/webhooks.json')
const Discord = require('discord.js')

module.exports = async (client, guild, message) => {
  try {
    const guildSchema = require('../../databases/Schemas/Guild')
    guildSchema.findOneAndDelete({ Guild: guild.id }, async (err, data) => {
      if (err) return console.log(err)
    })

    /*
    const channel = client.channels.cache.get(logs.saidas)
    const webhooks = await channel.fetchWebhooks()
    const webhook = webhooks.first()
    */

    const embed = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setTitle('<:outline_remove_black_24dp:887149613864329228> Sai de um servidor')
      .addField('**Servidor**', ' ' + guild.name, true)
      .addField('**Servidor ID**', ' ' + guild.id, true)
      .addField('**Membros**', ' ' + guild.memberCount, true)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setImage(guild.bannerURL({ dynamic: true, size: 1024 }))
      .setFooter(ee.footertext, ee.footerico)
      .setTimestamp()
    //await webhook.send({ embeds: [embed] })
  } catch (e) {
    console.log(e)
  }
}
