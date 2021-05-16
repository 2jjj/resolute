const { MessageEmbed } = require('discord.js')
const db = require('quick.db');

module.exports = {
      run: async (client, message, args) => {

const aboutme = args.join(' ');
const user = message.author;
let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."

if (!aboutme) return message.reply(`<:info:835206734225473546> Siga o exemplo a seguir:\n ${prefix}sobremim Olá eu sou o ${message.author.username}!`);

db.set(`aboutme_${user.id}`, aboutme);

return message.reply('<:px0:843541299344572446> Mensagem alterada com sucesso! ⭐');
      }
}