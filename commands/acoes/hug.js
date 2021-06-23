const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: "hug",
  aliases: ["abraçar"],
  cooldown: 1000 * 2, 
  description: "Abraçe alguém",
  category: "gifs",
  usage: "@user",

async run (client, message, args) {

var list = [
  'https://imgur.com/Ch56F8E.gif',
  'https://imgur.com/E7achiC.gif',
  'https://imgur.com/kXufldu.gif'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  const help = new Discord.MessageEmbed()
  .setTitle("Comando de carinho")
  .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
  .setDescription("Abraçe alguém!!")
  .addField(`Forma de Utilização:`, ` \`${prefix}hug @usuario\``)
  .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
  .setImage(rand)
  .setTimestamp();
  return message.channel.send(help);
}

let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
    .setTitle('Hug')
    .setColor('#000000')
    .setDescription(`${message.author} acaba de abraçar o ${user}`)
    .setImage(rand)
    .setTimestamp()
    .setThumbnail(avatar)
    .setFooter('Resolute')
    .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}}