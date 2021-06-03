const cooldowns = {}
const ms = require("ms")
const db = require("quick.db")
const Discord = require("discord.js")

module.exports = {
  name: "ping",
  aliases: ['pp', 'latencia'],
  cooldown: 1000 * 2, 
  description: "Pong! Minha latência!",
  category: "outros",
  usage: "",

  async run (client, message, args) {

  const m = await message.channel.send('Ping?');
  
  let embed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setURL('https://resolutebot.xyz/')
  .setAuthor('Resolute', 'https://cdn.discordapp.com/avatars/764919941538775050/672afa4f2a4ac5fee624580229a2efbd.png?size=1024', 'https://resolutebot.xyz/')
  .setDescription(`<a:ping1:843544605201924168> **Pong!** \n ➥ O ping do servidor é: **${Date.now() - message.createdTimestamp}ms**. \n ➥ O ping da api é: **${Math.round(client.ws.ping)}ms**.`)
  .setTimestamp()
  .setFooter('Resolute™');

  m.edit(embed);
}}