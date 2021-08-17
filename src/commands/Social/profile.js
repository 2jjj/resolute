    const Discord = require("discord.js");
    const db = require("quick.db");

    module.exports = {
        name: "profile",
        aliases: [],
        cooldown: 1000 * 2,
        description: "",
        category: "misc",
        usage: "",
        example: "",
        permissoes: [],
        args: false,

        async run(client, message, args, cmduser, text, prefix, player) {
            const obj = {}
            const user = message.member;

            let inv = db.get(`${message.author.id}`)
            if (inv === null) inv = "Nada"

            let coins = db.fetch(`money_${message.author.id}`);
            if (coins == null) coins = 0;

            let sobre_mim = db.get(`sobre_mim_${user.id}`);
            if (sobre_mim == null) sobre_mim = `Altere essa mensagem com \`${prefix}sobremim\`!`;

            try {
                inv.map(x => {
                    if (!obj[x]) obj[x] = 0;
                    ++obj[x];
                })
            } catch (e) {
                var a = 4;
            }

            let str = '';

            for (const x in obj) {
                str += x + `(${obj[x]})\n`
            }

            if(a === 4) {
                str += `Você não possui nenhum item no inventário, compre itens com ${prefix}shop`
            }

            const profile = new Discord.MessageEmbed()
                .setAuthor(`Perfil de ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setColor("RANDOM")
               //.setDescription("MANUTENÇÃO!!!!!!!!!!!!!!!!!!!!!!!")
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                .addField(`Carteira:`, `Coins: \`${coins}\``)
                .addField(`Insigneas:`, ` \`a\``)
                .addField(`Inventário:`, ` \`${str}\``)
                .addField(`Sobre mim:`, `${sobre_mim}`)
                .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp();
            message.channel.send(profile);
        }
    }
//Créditos: Spray e cleiton#2040