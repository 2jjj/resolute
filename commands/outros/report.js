const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "report",
    aliases: ['bug', 'reportar'],
    cooldown: 1000 * 2, 
    description: "reportar",
    category: "outros",
    usage: "<Bug encontrado>",

    async run (client, message, args) {

    let canal = client.channels.cache.get("842984263392428032")
    let bug = args.join(' ');
    if(!bug) {
    return message.channel.send({embed: {
    description: "Descreva o bug encontrado!",
    color: "RED"
    }
    });
    }
    let embed = new Discord.MessageEmbed()
    .setTitle("Novo Bug/Report")
    .setThumbnail(client.user.displayAvatarURL())
    .addField("<:information:843542771814236170> | Servidor que reportou", `${message.guild.name}`)
    .addField("<:information:843542771814236170> | Reportado por", `${message.author.tag}`)
    .addField("<:information:843542771814236170> | Menção", `${message.author}`)
    .addField("<:information:843542771814236170> | ID de quem reportou", `${message.author.id}`)
    .addField("<:information:843542771814236170> | Bug", `\`${bug}\``)
    .setColor([255,182,193])
    canal.send(embed)

    message.channel.send({embed: {
    description: "<a:check:835206263075242029> Seu bug/report foi computado e enviado para minha equipe, muito obrigado por me ajudar a melhorar!\n Contato com o desenvolvedor: Spray#2885",
    color: "RED"
}
});
}
}