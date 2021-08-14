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
    args: false,

    async run(client, message, args, cmduser, text, prefix, player) {

        if (!args[0]) {
            let embed_help = new MessageEmbed()
                .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .addField(`Itens disponiveis:`, `Peixe - 15000 Rcoins`)
                .addField(`Como fazer uma compra?`, `É simples! basta usar ${prefix}buy <item>!`)

            message.channel.send(embed_help)
        }

        const user = message.member
        const bal = db.fetch(`money_${user.id}`) 

        if (args[0] === 'peixe') {
            //valor do peixe
            let amount = 10 

            if (bal < amount) {
                return message.reply(`Você não tem \`$15,000 RCoins\` para comprar um peixe!`)
            } else {
                const embed = new MessageEmbed()
                    .setAuthor(`${user.user.username}z`, user.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setDescription(`
                        <@${user.id}> Comprado com sucesso **1 peixe** por \`15,000 RCoins\`
                    `)
                    .setFooter('Shop - Resolute')
                message.channel.send(embed)
                db.push(`${user.id}`, `Peixe`)
                db.subtract(`money_${user.id}`, amount)
            }
        }
    }
}