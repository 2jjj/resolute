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
//casal
let casal = client.users.cache.get(db.get(`married_${user.id}`, message.author.id));
if (casal == null) casal = 'ninguém';
//casalid
let casalid = db.fetch(`married_${user.id}`, message.author.id);
if (casalid == null) casalid = '';
//sobremim
let aboutme = await db.fetch(`aboutme_${user.id}`);
if (aboutme == null) aboutme = `Olá eu sou o ${user.username} (Você pode alterar isso usando ${prefix}sobremim)!`;
//atm
let atm = await db.get(`flocos_${user.id}`) || 0;
//reps
let reps = db.fetch(`rep_${user.id}`);
if (reps == null) reps = '0';
//bugs
let totalbugs = db.fetch(`bugs_${message.author}`);
if (totalbugs == null) totalbugs = '0';
//embed
let embed = new Discord.MessageEmbed()
.setColor('#ff0000')
.setTitle(`Perfil de ${user.username}`)
.setDescription(`Casado(a) com: ${casal.username} \`(${casalid})\`\nFlocos: ${atm}\nReputações: ${reps}\nBugs reportados: ${totalbugs}\nSobre mim: **${aboutme}**`)
.setFooter(` | Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
message.reply(embed)
    }
}