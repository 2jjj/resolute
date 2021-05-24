const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."
let canal = client.channels.cache.get("842984263392428032")
let bug = args.join(' ');
if(!bug) {
return message.channel.send({embed: {
description: "<:Resoluteinfo:844971535927083088> Descreva o bug encontrado!",
color: "RED"
}
});
}
let embed = new Discord.MessageEmbed()
.setTitle("Novo Bug/Report")
.setThumbnail(client.user.displayAvatarURL())
.addField("<:Resoluteinfo:844971535927083088> | Servidor que reportou", `${message.guild.name}`)
.addField("<:Resoluteinfo:844971535927083088> | Reportado por", `${message.author.tag}`)
.addField("<:Resoluteinfo:844971535927083088> | Menção", `${message.author}`)
.addField("<:Resoluteinfo:844971535927083088> | ID de quem reportou", `${message.author.id}`)
.addField("<:Resoluteinfo:844971535927083088> | Bug", `\`${bug}\``)
.setColor([255,182,193])
canal.send(embed)

message.channel.send({embed: {
description: "<a:check:835206263075242029> Seu bug/report foi computado e enviado para minha equipe, muito obrigado! <3",
color: "RED"
}
});
}
