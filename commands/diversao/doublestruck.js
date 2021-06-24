const fetch = require('node-fetch');
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "doublestruck",
    aliases: ["ds"],
    cooldown: 1000 * 2, 
    description: "Fale por uma fonte dahora!",
    category: "fun",
    usage: "<texto>",
  
  async run (client, message, args) {
  
    let text = args.join("+")

    if(!text) {
      let prefix = db.get(`prefix_${message.guild.id}`)
      if (prefix === null) prefix = "s."

      const help = new Discord.MessageEmbed()
      .setTitle("Comando de doublestruck")
      .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
      .setDescription("𝔽𝕒ç𝕒 𝕒𝕤 𝕡𝕒𝕝𝕒𝕧𝕣𝕒𝕤 𝕗𝕚𝕔𝕒𝕣𝕖𝕞 𝕒𝕤𝕤𝕚𝕞")
      .addField(`Forma de Utilização:`, ` \`${prefix}doublestruck <texto>\``)
      .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp();
      return message.channel.send(help);
    }
  
    let res = await fetch('https://api.popcatdev.repl.co/doublestruck?text=' + text);
    let json = await res.json();
    message.channel.send(json.text)
 }
}