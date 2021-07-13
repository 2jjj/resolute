const Discord = require('discord.js')
const figlet = require("figlet")

module.exports = {
    name: "ascii",
    aliases: ["asciitext"],
    cooldown: 1000 * 2,
    description: "Converte o seu texto em para ascii!",
    category: "fun",
    usage: "<texto>",
    example: "meu texto!",
	args: true,

    async run(client, message, args) {

        if(!args[0]) return;

        figlet.text(args.join(" "), (err, text) => {

            if (err) {
                console.log(err)
                return message.channel.send(`Ocorreu um erro!`)
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(`Ascii`)
                .setColor("RANDOM")
                .setDescription(`\`\`\`${text.trimRight()}\`\`\``)

            message.channel.send(embed)
        })
    }
}