const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: "hug",
  aliases: ["abraçar"],
  cooldown: 1000 * 2, 
  description: "Abraçe alguém",
  category: "fun",
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
return message.reply('<:ybs_fixado2:851955202374107157> **|** lembre-se de mencionar um usuário válido para abraçar!');
}
/*
message.channel.send(`${message.author.username} **acaba de abraçar** ${user.username}! :heart:`, {files: [rand]});
*/
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