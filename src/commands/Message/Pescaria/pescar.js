const db = require("quick.db");
const Discord = require("discord.js");
const ee = require(`../../../config/embed.json`);

module.exports = {
    name: "pescar",
    aliases: [""],
    cooldown: 1000 * 2,
    description: "",
    category: "",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args, cmduser, text, prefix, player) {

        let user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author || message.member;
        db.add(`varinhas_${user.id}`, 1)

        let varinhas = db.fetch(`varinhas_${user.id}`)
        if (varinhas === null) varinhas = 0;

        let iscas = db.fetch(`iscas_${user.id}`)
        if (iscas === null) varinhas = 0;

        if (varinhas < 1) {
            const embed = new Discord.MessageEmbed()
                .addField(`Você não possui varinhas!`, `Para comprar uma varinha digite \`${prefix}shop\` e compre uma varinha.`)
                .setFooter(ee.footertext, ee.footericon)
                .setColor("#1E90FF");
            return message.channel.send(embed);
        }

        if(varinhas > 1) {
            if(iscas < 1) {
                const embed_isca = new Discord.MessageEmbed()
                    .addField(`Você não possui iscas!`, `Para comprar uma isca digite \`${prefix}shop\` e compre uma isca.`)
                    .setFooter(ee.footertext, ee.footericon)
                    .setColor("#1E90FF");
                return message.channel.send(embed_isca);       
            }
            let baiacus = Math.floor(Math.random() * 6 + 1);
            let salmoes = Math.floor(Math.random() * 3 + 1);
            let bacalhais = Math.floor(Math.random() * 10 + 1);

            db.add(`baiacus_${user.id}`, baiacus)
            db.add(`salmoes_${user.id}`, salmoes)
            db.add(`bacalhais_${user.id}`, bacalhais)
            
            const embed = new Discord.MessageEmbed()
                .setTitle('<:pescaria:879504651739861064> Pescaria')
                .setDescription(`Você pescou e conseguiu:
                
                ${baiacus} baiacus
                ${salmoes} salmoes
                ${bacalhais} bacalhais
                `)
                .setFooter(ee.footertext, ee.footericon)
                .setColor("#1E90FF");
            return message.channel.send(embed);
        }
    }
}