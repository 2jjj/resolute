const { MessageEmbed } = require('discord.js')
const db = require('quick.db');

module.exports = {
      run: async (client, message, args) => {

const aboutme = args.join(' ');
const user = message.author;
let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."

if (!aboutme) return message.reply(`<:Resoluteinfo:844971535927083088> Siga o exemplo a seguir:\n ${prefix}sobremim Olá eu sou o ${message.author.username}!`);

db.set(`aboutme_${user.id}`, aboutme);

return message.reply('<:Resoluteinfo:844971535927083088> Mensagem alterada com sucesso! ⭐');
      }
}