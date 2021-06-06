const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "warnlist",
    aliases: ['userwarns'],
    cooldown: 1000 * 2, 
    description: "Warns de um usuário.",
    category: "mod",
    usage: "",
  
async run (client, message, args) {

let user = message.mentions.members.first() || message.author;
if(!user) {
return message.channel.send("> Mencione um user para ver os warn's dele.")
}

let warns = await db.get(`warnsCount_${message.guild.id}-${user.id}`) || 0;

const embed = new Discord.MessageEmbed()

.setTitle(' :scales:  **|** Warns')
.setColor("RANDOM")
.setDescription (`<:setaazul:843588568605523969> **${user} Tem ${warns} Warns \n<:setaazul:843588568605523969> ** Siga as regras para não sofrer advertencia!`)

message.channel.send(embed);
}
}