const ee = require('../../config/embed.json')
const { logs } = require('../../config/webhooks.json')
const Discord = require('discord.js')

module.exports = async (client, guild) => {
  try {
    const guildSchema = require('../../databases/Schemas/Guild')
    guildSchema.findOneAndDelete({ Guild: guild.id }, async (err, data) => {
      if (err) return console.log(err)
    })

    /*

    const channel = client.channels.cache.get(logs.entradas)
    const webhooks = await channel.fetchWebhooks()
    const webhook = webhooks.first()
    const dono = await guild.fetchOwner() */

    const embed = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setTitle('<:outline_add_black_24dp:884959502577844244> Novo servidor!')
      .addField('**Servidor**', ' ' + guild.name, true)
      .addField('**Server ID**', ' ' + guild.id, true)
      .addField('**Dono**', ' ' + `${dono.user.username}#${dono.user.discriminator}(${dono})`)
      .addField('**Total de membros**', ' ' + guild.memberCount, true)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setImage(guild.bannerURL({ dynamic: true, size: 1024 }))
      .setFooter(ee.footertext, ee.footericon)
      .setTimestamp()
    //await webhook.send({ embeds: [embed] })
  } catch (e) {
    console.log(e)
  }
}
