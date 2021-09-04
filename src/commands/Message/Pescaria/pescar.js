const db = require("quick.db");
const Discord = require("discord.js");
const ee = require(`../../../config/embed.json`);
const peixes = require("./peixes.json")

module.exports = {
    name: "pescar",
    aliases: [""],
    cooldown: 1000 * 2,
    description: "",
    category: "pescaria",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args, prefix) {

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
            return message.reply({ embeds: [embed] });
        }

        if(varinhas > 1) {
            if(iscas < 1) {
                const embed_isca = new Discord.MessageEmbed()
                    .addField(`Você não possui iscas!`, `Para comprar uma isca digite \`${prefix}shop\` e compre uma isca.`)
                    .setFooter(ee.footertext, ee.footericon)
                    .setColor("#1E90FF");
                return message.reply({ embeds: [embed_isca] });      
            }
            let baiacus = Math.floor(Math.random() * 6 + 1);
            let salmoes = Math.floor(Math.random() * 3 + 1);
            let bacalhais = Math.floor(Math.random() * 10 + 1);
            let bota = Math.floor(Math.random() * 2 + 1);
            let tilapias = Math.floor(Math.random() * 7 + 1);
            let pirapitingas = Math.floor(Math.random() * 14 + 1);
            let piraibas = Math.floor(Math.random() * 20 + 1);
            let pirararas = Math.floor(Math.random() * 4 + 1);

            db.add(`baiacus_${user.id}`, baiacus)
            db.add(`salmoes_${user.id}`, salmoes)
            db.add(`bacalhais_${user.id}`, bacalhais)

            var rand1 = peixes[Math.floor(Math.random() * peixes.length)];
            var rand2 = peixes[Math.floor(Math.random() * peixes.length)];
            var rand3 = peixes[Math.floor(Math.random() * peixes.length)];
            var arr = [];
            var arr_final = arr.concat(rand1, rand2, rand3)

            const embed = new Discord.MessageEmbed()
                .setTitle('<:pescaria:879504651739861064> Pescaria')
                .setDescription(`Você pescou e conseguiu:
                
                ${baiacus} Baiacus
                ${salmoes} Salmoes
                ${bacalhais} Bacalhais
                `)
                .setFooter(ee.footertext, ee.footericon)
                .setColor("#1E90FF");
            return message.reply({ embeds: [embed] });
        }
    }
}