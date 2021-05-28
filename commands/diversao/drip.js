const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: "drip",
  aliases: [],
  cooldown: 1000 * 2, 
  description: "dev",
  category: "fun",

async run (client, message, args) {

let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."

var list = [
  'https://media.tenor.com/images/e58039b267965023b1b047d440d6bf24/tenor.gif',
  'https://media.tenor.com/images/afd634e4216d2a75a2a33388657c06b9/tenor.gif',
  'https://thumbs.gfycat.com/CleanWildAmericancicada-max-1mb.gif',
  'https://media.tenor.com/images/e58039b267965023b1b047d440d6bf24/tenor.gif',
  'https://media.tenor.com/images/fc4d6097153e74bae547e089218b6aef/tenor.gif',
  'https://media.tenor.com/images/d05dd6d1d6d0d1ecd7688143fce46f6d/tenor.gif'
];
var rand = list[Math.floor(Math.random() * list.length)];



let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle(`Drip | 🥶🥶🥶🥶🥶🥶🥶`)
        .setColor('#ffffff')
        .setDescription(`${message.author} Mostrou seu drip`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('vai encarar?')
        .setAuthor(message.author.tag, avatar);
      message.channel.send(embed);
}}