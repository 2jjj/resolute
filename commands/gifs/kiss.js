const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: "kiss",
  aliases: ["beijar"],
  cooldown: 1000 * 2, 
  description: "Beije alguém :flushed:",
  category: "fun",
  usage: "@user",

async run (client, message, args) {

var list = [
  'https://imgur.com/iclUiUN.gif',
  'https://imgur.com/lYQt9rx.gif',
  'https://imgur.com/S06xR53.gif',
  'https://imgur.com/Z9c28zI.gif',
  'https://imgur.com/w1TU5mR.gif'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para beijar!');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Kiss')
        .setColor('#000000')
        .setDescription(`${message.author} acaba de beijar o ${user}`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('Resolute')
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}}