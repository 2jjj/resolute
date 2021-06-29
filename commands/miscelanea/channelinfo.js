const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "channelinfo",
    aliases: ['canalinfo'],
    cooldown: 1000 * 2, 
    description: "Obtenha informações de um canal",
    category: "outros",
    usage: "<canal>",
    example: "channelinfo #geral",

    async run (client, message, args) {

        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;

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