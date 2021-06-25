const Discord = require('discord.js');
const db = require('quick.db');
        
module.exports = {
    name: "votar",
    aliases: ['votacao', 'vote'],
    cooldown: 1000 * 2, 
    description: "Abra uma votação",
    category: "outros",
    usage: `<conteudo>`,

    async run (client, message, args) {

    var content = args.join(' ')
    if (content.length > 600) { return message.inlineReply('<:1926blurplecross:856520144872407060> **|** O conteúdo a ser votado não pode passar de **600 caracteres.**') }

    var embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`Votação aberta por ${message.author.username}`)
        .setDescription(content)

    if (!content) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) { prefix = "s." }
  
        const help = new Discord.MessageEmbed()
        .setTitle("Comando de warn")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription("Faça uma votação!")
        .addField(`Forma de Utilização:`, ` \`${prefix}votar <conteudo>\``)
        .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        return message.channel.send(help);
    }

    if (content) {
        return message.channel.send(embed).then(msg => {
            msg.react(`<a:sim:845773734862258197>`).catch(err => { return })
            msg.react(`<a:nao:845773685330804756>`).catch(err => { return })
        })
    }
}}