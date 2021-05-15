const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."
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
.setTitle("Novo Bug reportado")
.setThumbnail(client.user.displayAvatarURL())
.addField("Servidor que reportou", `${message.guild.name}`)
.addField("Reportado por", `${message.author.tag}`)
.addField("Menção", `${message.author}`)
.addField("ID de quem reportou", `${message.author.id}`)
.addField("Bug", `\`${bug}\``)
.setColor([255,182,193])
canal.send(embed)

message.channel.send({embed: {
description: "<a:check:835206263075242029> Seu bug foi computado e enviado para minha equipe, muito obrigado! <3",
color: "RED"
}
});
}
