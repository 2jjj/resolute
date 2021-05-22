const Discord = require("discord.js")
require("../../inlineReply")
const db = require("quick.db")

module.exports = async (client, message) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }

    if (message.mentions.has(client.user.id)) { return message.inlineReply(`<:dy_girlHello:841125764690739203> Olá! ${message.author}\n > Meu prefixo é \`s.\`, use \`s.ajuda\` para ajuda!\n > Me adicione -> **https://resolutebot.xyz**`).then(msg => msg.delete({ timeout: 15000 })).catch(err => { return }) }
}
