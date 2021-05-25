const Discord = require('discord.js');
module.exports = {
    name: "help",
    alias: ["ajuda"],
    category: "outros",
    run: (client, message, args) => {
        
        let manipulacao = client.commands.filter((cmd) => cmd.category === 'manipulacao');
        let mod = client.commands.filter((cmd) => cmd.category === 'mod');
        let music = client.commands.filter((cmd) => cmd.category === 'musica');
        let outros = client.commands.filter((cmd) => cmd.category === 'outros');

        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor('Resolute - Ajuda', message.author.displayAvatarURL({dynamic: true}))
        .setDescription('Developement by MrSprayX#0012')
        .addField(`<:staff:843586666845044736> **Manipulação de imagens** [${manipulacao.size}]:`, manipulacao.map(cmd => cmd.name).join(' | '))
        .addField(`<:staff:843586666845044736> **Moderação** [${mod.size}]:`, mod.map(cmd => cmd.name).join(' | '))
        .addField(`<:music:843602147051700284> **Música** [${music.size}]:`, music.map(cmd => cmd.name).join(' | '))
        .addField(`<:2637settings:843854352867262504> **Outros** [${outros.size}]:`, outros.map(cmd => cmd.name).join(' | '))
        .setColor("RANDOM")
        .setTimestamp()

        message.channel.send(helpEmbed);
    }
}