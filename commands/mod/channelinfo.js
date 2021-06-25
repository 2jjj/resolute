const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "channelinfo",
    aliases: ['canalinfo'],
    cooldown: 1000 * 2, 
    description: "Ver informações do canal",
    category: "mod",
    usage: "",

    async run (client, message, args) {

        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        
        if (!channel) {
			let prefix = db.get(`prefix_${message.guild.id}`)
			if (prefix === null) prefix = "s."

			const help = new Discord.MessageEmbed()
				.setTitle("Comando de channelinfo")
				.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
				.setDescription("Conseguir informações de um canal")
				.addField(`Forma de Utilização:`, ` \`${prefix}channelinfo <#canal>\``)
				.setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({
					dynamic: true
				}))
				.setImage(rand)
				.setTimestamp();
			return message.channel.send(help);
        }

        let channelembed = new MessageEmbed()
            .setTitle(`${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**NSFW**", channel.nsfw, true)
            .addField("**ID**", channel.id, true)
            .addField("**Tipo**", channel.type)
            .addField("**Descrição**", `${channel.topic || "Sem descrição"}`)
            .addField("**Canal criado em**", channel.createdAt)
            .setColor("GREEN")
        message.channel.send(channelembed);
    }
}