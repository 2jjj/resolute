const Discord = require("discord.js")
module.exports = {
  name: "biden",
  aliases: ["bidenmeme"],
  cooldown: 1000 * 2,
  description: "",
  category: "manipulacao",
  usage: "<texto>",
  example: "ola amigos!",
  permissoes: [],
  args: true,
  
  async run(client, message, args) {

    const sentence = args.join(" ")
    if (!sentence) return;
    let embed = new Discord.MessageEmbed()
      .setTitle('Biden')
      .setImage(`https://api.popcatdev.repl.co/biden?text=${encodeURIComponent(sentence)}`)
      .setColor('ORANGE')
      .setFooter(' ');
    message.channel.send(embed)
    
  }
}