const Discord = require("discord.js")
exports.run = async (client, message, args) => {
message.delete() //Tira esse delete se quiser

let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author; //Este let pega o Avatar por Menção e por ID, E se não menciona nem por ID de ninguém ele mostrara o seu Avatar.

let avatar = user.displayAvatarURL({ dynamic: true, size: 4096 }) //Mostra o Avatar do Usuário em GIF ou PNG em uma Qualidade boa.

let embed = new MessageEmbed()
.setAuthor(`${user.username}`)
.setDescription(`**[Baixe o Avatar Aqui](${avatar})**`) //Isso será para Baixar o Avatar pelo Link.
.setImage(avatar)
.setColor("RANDOM") //Adicione a Cor que você quiser.

message.reply(embed)
}
exports.help = {
name: "avatar"
}