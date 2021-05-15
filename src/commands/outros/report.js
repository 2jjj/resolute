const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

let user = client.users.cache.get("836345581424738354")

const reporte = args.join(" ")
if(!reporte) return message.channel.send(`${message.author} você deve digitar o bug`) 

const embed = new Discord.MessageEmbed()
.setTitle("Novo bug")
.addField("Autor Da Mensagem", `\`${message.author.tag}\`\n\`${message.author.id}\``)
.addField("Bug Reportado", `${reporte}`)
.setFooter(`Reportado em ${message.guild.name}`)
.setColor("RANDOM")
user.send(embed)
}