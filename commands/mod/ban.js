const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
  name: "ban",
  aliases: ['banir'],
  cooldown: 1000 * 2, 
  description: "Banir uma pessoa.",
  category: "mod",
  usage: "@user motivo",

async run (client, message, args) {
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) { prefix = "s." }
  
      var list = [
        'https://imgur.com/ZNuAcum.gif',
        'https://imgur.com/xlD7P3N.gif',
        'https://imgur.com/cT6TUwv.gif',
        'https://imgur.com/7l7n5un.gif',
        'https://imgur.com/NYZsPRx.gif',
        'https://imgur.com/gVAiCX6.gif',
        'https://imgur.com/usOD4UR.gif',
        'https://imgur.com/4uDadjQ.gif'
      ]
    
      var rand = list[Math.floor(Math.random() * list.length)]

        message.delete();

        if(!args.length) {
            const help = new Discord.MessageEmbed()
            .setTitle("Comando de ban")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription("Execute um ban em algum usuário específico utilizando este comando!")
            .addField(`Forma de Utilização:`, ` \`${prefix}ban @usuario <motivo>\``)
            .addField(`Exemplo:`, `  \`${prefix}ban @Spray#0007 Ofensa a staff\``)
            .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setImage(rand)
            .setTimestamp();
            return message.channel.send(help);
        }

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: {color: "#ff0000", description: "Você não tem permissão para utilizar este comando! | Permissão necessária: BAN_MEMBERS"}}) 

        const usuario = message.mentions.members.first()
    
        const motivo = args.slice(1).join(" ");

        if(!usuario.bannable) return message.channel.send({embed: {color: "#ff0000", description: "Eu não tenho permissão para banir este usuário! | Permissão necessária: BAN_MEMBERS"}})

        const embed = new Discord.MessageEmbed()
        .setTitle("Novo Banimento!")
        .setColor("#ff0000")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .addField(`Usuário:`, `${usuario} (${usuario.id})`)
        .addField(`Autor:`, `${message.author} (${message.author.id})`)
        .addField(`Motivo:`, `${motivo}`)
        .setFooter("Resolute - Punições", message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);

        const pv = new Discord.MessageEmbed()
        .setTitle("Você foi banido!")
        .setColor("#ff0000")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .addField("<:mod:856894534088523776> Autor:", `${message.author} (${message.author.id})`)
        .addField("<:mod:856894534088523776> Motivo:", `${motivo}`)
        .setImage(rand)
        .setFooter("Resolute - Punições", message.guild.iconURL({dynamic: true}))
        .setTimestamp();
        usuario.send(pv);
        usuario.ban();
    }
  }