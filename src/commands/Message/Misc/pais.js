const {
    MessageEmbed
} = require("discord.js");
const pop = require("popcat-wrapper");

module.exports = {
    name: "pais",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Consiga informações de um pais",
    category: "misc",
    usage: "<pais>",
    example: "Canada",
    permissoes: [],
    args: true,

    async run(client, message, args) {
        if(!args[0]) return;
        
        const text = args.slice(0).join(" ")
        try {
            const c = await pop.country(text)

            const embed = new MessageEmbed()
                .setTitle(c.name)
                .setColor("4169e1")
                .setThumbnail(c.flag)
                .addField("Nome:", c.name, true)
                .addField("Capital:", c.capital, true)
                .addField("Dominio:", c.domain, true)
                .addField("Região:", c.region, true)
                .addField("População:", c.population, true)
                .addField("Área:", c.area, true)
                .addField("Moeda:", `${c.currency.name} (${c.currency.short})\nSimbolo: ${c.currency.symbol}`)
            message.channel.send(embed)
        } catch(e) {
            message.inlineReply("Não encontrei esse pais!")
        }
    }
}