const Discord = require('discord.js')
const db = require('quick.db');
module.exports = {
    name: "perfil",
    aliases: ["profile"],
    cooldown: 10,
    async run(client, message, args) {

let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."

const user = message.mentions.users.first() || message.author;

let aboutme = await db.fetch(`aboutme_${user.id}`);
if (aboutme == null) aboutme = `Olá eu sou o ${user.username} (Você pode alterar isso usando ${prefix}sobremim)!`;

let embed = new Discord.MessageEmbed()
.setColor('#ff0000')
.setTitle(`Perfil de ${user.username}`)
.setDescription(`Bugs reportados: ${totalbugs}\nSobre mim: **${aboutme}**`)
.setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
message.reply(embed)
    }
}