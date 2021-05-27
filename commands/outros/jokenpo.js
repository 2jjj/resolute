const Discord = require('discord.js')



module.exports = {
    name: "jokenpo",
    aliases: ['pedrapapeltesoura'],
    cooldown: 1000 * 2, 
    description: "horas",
    category: "outros",

    async run (bot, message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Pedra, Papel, Tesoura!")
        .setDescription("Reaja para jogar!")
        .setTimestamp()
        let msg = await message.channel.send(embed)
        await msg.react("🗻")
        await msg.react("✂")
        await msg.react("📰")

        const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max: 1, time: 60000, error: ["time"]}).then(
            async(collected) => {
                const reaction = collected.first()
                let result = new Discord.MessageEmbed()
                .setTitle("Resultado")
                .addField("Sua escolha", `${reaction.emoji.name}`)
                .addField("Escolha de bot", `${me}`)
                await msg.edit(result)

                if((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "✂" && reaction.emoji.name === "📰") ||
                (me === "📰" && reaction.emoji.name === "🗻")) {
                    message.reply("Você perdeu!");
                } else if (me === reaction.emoji.name) {
                    return message.reply("É um empate!");
                } else {
                    return message.reply("você ganhou!");
                }
            })
            .catch(collected => {
                message.reply('O processo foi cancelado, você não respondeu a tempo!');
            }) 

    }
}