const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: "help",
    alias: ["ajuda"],
    category: "outros",
    run: (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        let fun = client.commands.filter((cmd) => cmd.category === 'fun');
        let economia = client.commands.filter((cmd) => cmd.category === 'economia');
        let manipulacao = client.commands.filter((cmd) => cmd.category === 'manipulacao');
        let mod = client.commands.filter((cmd) => cmd.category === 'mod');
        let music = client.commands.filter((cmd) => cmd.category === 'musica');
        let outros = client.commands.filter((cmd) => cmd.category === 'outros');    
        let config = client.commands.filter((cmd) => cmd.category === 'config');    

        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor('Resolute - Ajuda', message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`**Desenvolvido por MrSprayX#0012**\n**prefixo atual: ${prefix}**`)
        .addField(`<:4693_pink_hair_popcorn:843542215708114994> **Diversão** [${fun.size}]:`, `\`${fun.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:money1:846828402350489640> **Economia** [${economia.size}]:`, `\`${economia.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:3624personframe:843854352934633542> **Manipulação de imagens** [${manipulacao.size}]:`, `\`${manipulacao.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:staff:843586666845044736> **Moderação** [${mod.size}]:`, `\`${mod.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:music:843602147051700284> **Música** [${music.size}]:`, `\`${music.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:y_pontinho:843648515695444019> **Outros** [${outros.size}]:`, `\`${outros.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:2637settings:843854352867262504> **Configuráveis** [${config.size}]:`, `\`${config.map(cmd => cmd.name).join(' | ')}\``)
        .setColor("RANDOM")
        .setTimestamp()

        message.channel.send(helpEmbed);
    }
}