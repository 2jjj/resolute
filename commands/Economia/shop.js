const Discord = require("discord.js");

module.exports = {
    name: "shop",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Veja o shop com os itens disponiveis!",
    category: "economia",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {

        const profile = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setDescription("Obtenha itens em nosso shopping!")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .addField(`Itens disponiveis:`, `Peixe - 15000 Rcoins`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();
        message.channel.send(profile);
    }
}