const canvacord = require('canvacord')
const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: "comment",
    aliases: [],
    description: 'Ultiliza seu texto para um comentario do youtube!',
    category: "manipulacao",
    cooldown: 1000 * 2, 
}

module.exports.run = async (client, message, args) => {
	
        const comment = args.join('');
        if(!comment) return message.channel.send(`:x: Dê algo para Comentar!`)
        try {    
        let yt = await canvacord.Canvas.youtube({"avatar":message.author.displayAvatarURL({format: "png"}),"username":message.author.username, "content":args.join(" ")})
        let attachment = new Discord.MessageAttachment(yt, 'comment.png')
        message.channel.send(attachment)
    }catch(err) {
        const embed2 = new Discord.MessageEmbed()
    .setTitle(`${client.emotes.error} Algo correu mal.\n:x: Nota : Não funcionará se o Utilizador contiver caracteres Indesejados no seu nome de utilizador.`)
    .setColor("RED")
    message.channel.send(embed2)
    }

}