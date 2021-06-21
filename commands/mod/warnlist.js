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
    return message.channel.send("<a:SETA:852194614927818812> Mencione um user para ver os warn's dele.")
    }

    let warns = await db.get(`warnsCount_${message.guild.id}-${user.id}`) || 0;

    const embed = new Discord.MessageEmbed()

    .setTitle(':scales:  **|** Warnlist')
    .setColor("RANDOM")
    .setDescription (`<a:SETA:852194614927818812> **${user} Tem ${warns} Warns \n<a:SETA:852194614927818812> ** Siga as regras para não sofrer advertencia!`)
    .setFooter(
        `Requisitado por ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
    )

    message.channel.send(embed);
}}