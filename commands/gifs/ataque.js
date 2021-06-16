const Discord = require("discord.js");

module.exports = {
    name: "ataque",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Ataque alguém!!!",
    category: "fun",
    usage: "@user",
  
    async run (client, message, args) {
    
    var list = [
    'http://27.media.tumblr.com/tumblr_lj7iubw5fn1qgq4hio1_500.gif',
    'https://64.media.tumblr.com/2fdab5ad7bd92c0c38881d00c6686a45/tumblr_inline_pbpzd9xckk1rrd628_500.gif',
    'https://i.pinimg.com/originals/c1/3c/42/c13c429ad79aeac088b8d6e0ba9aadeb.gif',
    'http://i1265.photobucket.com/albums/jj511/KingMick1/VegetavsBills2_zps6edee727.gif?t=1379957595',
    'https://www.ultrajovem.com.br/wp-content/uploads/2017/06/luta.gif',
    'https://i.pinimg.com/originals/a0/b5/37/a0b537461feb1254de445827292283f6.gif'
  ];

  var rand = list[Math.floor(Math.random() * list.length)];
  let pessoa = message.mentions.users.first() || client.users.cache.get(args[0]);
  
  if (!pessoa) return message.channel.send(`:no: | ${message.author} Mencione alguém para um atacar!`);

  let ataque = new Discord.MessageEmbed()
  .setTitle(`😤 Ataque! 😭`)
  .setDescription(`💔${pessoa} o ${message.author} te atacou!`)
  .setImage(rand)
  .setTimestamp()
  .setColor("YELLOW")
  .setThumbnail(message.author.displayAvatarURL({format:"png"}))
  .setFooter(`Atacado por: ${message.author.username}`, message.author.displayAvatarURL({format:"png"}));

  message.channel.send(ataque)
  
  }
}