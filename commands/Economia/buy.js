const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "buy",
    aliases: [],
    cooldown: 1000 * 2,
    description: "",
    category: "economia",
    usage: "",
    example: "cara",
    permissoes: [],
    args: true,
  

    async run(client, message, args) {

            const user = message.member
            const amount = 10 // Amount Of Fish Rod: $15,000
            const bal = db.fetch(`money_${user.id}`) // Get User's Money In Wallet

            if(bal <amount) { // If Balance In Wallet Is Less Then Amount Of Laptop
                return message.reply(`You Don't Have Enough Money(\`$15,000\`) In Wallet To But Fish Rod`)
            } else {
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Purchased`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
<@${user.id}> Successfully Purchased **1** *Fish Rod* For \`$15,000\`
                `)
                .setFooter('Shop')
                message.channel.send(embed)
                db.add(`fishrod_${user.id}`, 1) // Add 1 Laptop To User
                db.subtract(`money_${user.id}`, amount) // Remove Money From Using
            }
        }
    }
