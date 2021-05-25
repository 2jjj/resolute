const Discord = require("discord.js"); 
const db = require("quick.db");

module.exports = {
  name: "avatar",
  aliases: ['av', 'icon'],
  cooldown: 1000 * 2, 
  description: "avatar",
  category: "outros",

  async run (client, message, args) {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let embed = new Discord.MessageEmbed() 
    .setColor(`#4cd8b2`) 
    .setTitle(`<:Resoluteinfo:844971535927083088> » Avatar de ${user.username}`) 
    .setImage(avatar) 
    .setFooter(`» Autor: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
 await message.channel.send(embed); 

}
}